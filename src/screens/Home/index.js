import React, { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Header, TotalCars, HeaderContent, FlatCars } from './styles';
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

// const data = [
// 	{
// 		id: '1',
// 		brand: 'Panamera',
// 		name: 'Porche',
// 		rent: {
// 			period: 'AO DIA',
// 			price: 120,
// 		},
// 		thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-PNG-Images-HD.png',
// 	},
// 	{
// 		id: '2',
// 		brand: 'Panamera',
// 		name: 'Porche AXu 5670',
// 		rent: {
// 			period: 'AO DIA',
// 			price: 120,
// 		},
// 		thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-PNG-Images-HD.png',
// 	},
// 	{
// 		id: '3',
// 		brand: 'Panamera',
// 		name: 'Porche AXu 5670',
// 		rent: {
// 			period: 'AO DIA',
// 			price: 120,
// 		},
// 		thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-PNG-Images-HD.png',
// 	},
// 	{
// 		id: '4',
// 		brand: 'Panamera',
// 		name: 'Porche AXu 5670',
// 		rent: {
// 			period: 'AO DIA',
// 			price: 120,
// 		},
// 		thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-PNG-Images-HD.png',
// 	},
// 	{
// 		id: '5',
// 		brand: 'Panamera',
// 		name: 'Porche AXu 5670',
// 		rent: {
// 			period: 'AO DIA',
// 			price: 120,
// 		},
// 		thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-PNG-Images-HD.png',
// 	},
// ];

export const Home = () => {
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
			/>
			<FloatingButton onPress={handleMyRents} />
		</Container>
	);
};
