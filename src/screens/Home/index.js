import React, { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {
	Container,
	Header,
	TotalCars,
	HeaderContent,
	FlatCars,
	NoConnectionSVG,
	ProfileWrapper,
	HeaderWrapper,
} from './styles';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import { Spinner } from '../../components/Spinner';
import { FloatingButton } from '../../components/FloatingButton/index.js';
import { ref, child, get } from 'firebase/database';
import { db } from '../../config/config';
import { ToogleMenu } from '../../components/ToogleMenu';
import { Button } from '../../components/Button';

export const Home = () => {
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const dbRef = ref(db);
			const snapshot = await get(child(dbRef, 'cars'));
			if (snapshot.exists()) {
				setData(snapshot.val());
			} else {
				console.log('No data available');
			}
		} catch (error) {
			console.log('Olha o erro:', error);
			Alert.alert('Ops...');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleCar = (car) => {
		navigation.navigate('Details', { car });
	};

	const handleMyRents = () => {
		navigation.navigate('UserRents');
	};

	return (
		<Container>
			<Header>
				<HeaderContent>
					<Logo width={RFValue(100)} height={RFValue(100)} />
					<HeaderWrapper>
						<ProfileWrapper>
							<ToogleMenu />
						</ProfileWrapper>
						<TotalCars>{!isLoading && `Total de carros: ${data?.length}`}</TotalCars>
					</HeaderWrapper>
				</HeaderContent>
			</Header>
			{isLoading && <Spinner />}
			<FlatCars
				data={data}
				renderItem={({ item }) => <Car onPress={() => handleCar(item)} data={item} />}
				keyExtractor={(item) => item.id}
				onRefresh={fetchData}
				refreshing={false}
			/>
			{!isLoading && data.length === 0 && (
				<>
					<NoConnectionSVG />
					<Button title="Tentar novamente" onPress={fetchData} />
				</>
			)}
			<FloatingButton onPress={handleMyRents} />
		</Container>
	);
};
