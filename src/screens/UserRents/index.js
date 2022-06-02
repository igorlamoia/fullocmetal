import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
	Container,
	Header,
	Title,
	Text,
	FlatCars,
	TextView,
	TextDate,
	PeriodView,
	DateWrapper,
	PeriodText,
	NoCarsToShow,
	NoCarsContainer,
	Message,
	NumberRents,
} from './styles';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import SvgArrow from '../../assets/arrow.svg';
// import api from '../../services/api';
import { getDatabase, ref, child, get, onValue } from 'firebase/database';
// import firebase from '../../config/config';
import { db } from '../../config/config';
import { Spinner } from '../../components/Spinner';

// const data: CarData[] = [
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

export const UserRents = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [rentedCars, setRentedCars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const getRentedCarsFromUser = async () => {
		try {
			setIsLoading(true);
			onValue(ref(db, 'schedules_byuser'), (snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					setRentedCars(snapshot.val());
				} else {
					console.log('No data available');
				}
			});
			// const { data } = await api.get(`schedules_byuser?user_id=1`);
			// setRentedCars(data);
		} catch (error) {
			Alert.alert('Ops...', 'Algo de errado aconteceu');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getRentedCarsFromUser();
	}, []);

	return (
		<Container>
			<Header>
				<BackButton onPress={handleGoBack} color={theme.colors.background_secondary} />
				<Title>
					Seus agendamentos, {'\n'}
					estão aqui.
				</Title>
				<Text>Conforto, segurança e praticidade.</Text>
			</Header>
			<TextView>
				<Text>Agendamentos feitos</Text>
				<NumberRents>{rentedCars.length}</NumberRents>
			</TextView>
			{isLoading && <Spinner />}
			{!isLoading && rentedCars.length > 0 && (
				<FlatCars
					data={rentedCars}
					renderItem={({ item }) => (
						<>
							<Car data={item.car} />
							<PeriodView>
								<PeriodText>Periodo</PeriodText>
								<DateWrapper>
									<TextDate>{item.startDate}</TextDate>
									<SvgArrow width="14" height="8" />
									<TextDate>{item.endDate}</TextDate>
								</DateWrapper>
							</PeriodView>
						</>
					)}
					keyExtractor={(item) => String(item.id)}
				/>
			)}
			{!isLoading && rentedCars.length === 0 && (
				<NoCarsContainer>
					<Message>Sua lista está vazia!</Message>
					<NoCarsToShow />
				</NoCarsContainer>
			)}
		</Container>
	);
};
