import React, { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Header, TotalCars, HeaderContent, FlatCars, NoConnectionSVG } from './styles';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Alert } from 'react-native';
import { Spinner } from '../../components/Spinner';
import { FloatingButton } from '../../components/FloatingButton/index.js';
import { getDatabase, ref, child, get, onValue } from 'firebase/database';
// import firebase from '../../config/config';
import { db } from '../../config/config';

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
					<TotalCars>Total de carros: {data?.length}</TotalCars>
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
			{!isLoading && data.length === 0 && <NoConnectionSVG />}
			<FloatingButton onPress={handleMyRents} />
		</Container>
	);
};
