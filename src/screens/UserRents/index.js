import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
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
import SvgArrow from '../../assets/arrow.svg';
import { ref, onValue, get, child } from 'firebase/database';
import { db } from '../../config/config';
import { Spinner } from '../../components/Spinner';
import Modal from 'react-native-modal';

import { Button } from '../../components/Button';
import { MenuCarRented } from './components/Menu';

export const UserRents = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [rentedCars, setRentedCars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const getRentedCarsFromUser = async () => {
		try {
			setIsLoading(true);
			const dbRef = ref(db);
			const snapshot = await get(child(dbRef, 'schedules_byuser/' + 'newUserkkk'));
			if (snapshot.exists()) {
				const reservas = snapshot.val();
				const arrayReservedCars = Object.values(reservas).map((reserva) => reserva);
				// console.log(arrayReservedCars);
				setRentedCars(arrayReservedCars);
			} else {
				setRentedCars([]);
			}
		} catch (error) {
			Alert.alert('Ops...', 'Algo de errado aconteceu');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getRentedCarsFromUser();
	}, []);

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

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
							<MenuCarRented item={item} toggleModal={toggleModal} />
							<PeriodView>
								<PeriodText>Periodo</PeriodText>
								<DateWrapper>
									<TextDate>{item.start}</TextDate>
									<SvgArrow width="14" height="8" />
									<TextDate>{item.end}</TextDate>
								</DateWrapper>
							</PeriodView>
						</>
					)}
					keyExtractor={(item) => String(item.timestamp)}
				/>
			)}
			{!isLoading && rentedCars.length === 0 && (
				<NoCarsContainer>
					<Message>Sua garagem está vazia!</Message>
					<NoCarsToShow />
				</NoCarsContainer>
			)}
			<Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
				<View style={{ backgroundColor: 'white', height: '50%' }}>
					<Text>X</Text>
					<Text>Deseja realmente cancelar?</Text>
					<Text>Você pode editar a data agendada de acordo com sua </Text>

					<Button title="Cancelar Sapoha" onPress={toggleModal} />
				</View>
			</Modal>
		</Container>
	);
};
