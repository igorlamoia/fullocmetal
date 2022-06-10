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
	Options,
	MenuView,
	MenuItemStyled,
} from './styles';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import SvgArrow from '../../assets/arrow.svg';
import { ref, onValue, get, child } from 'firebase/database';
import { db } from '../../config/config';
import { Spinner } from '../../components/Spinner';
import Modal from 'react-native-modal';

import { Menu, MenuDivider } from 'react-native-material-menu';
import { Button } from '../../components/Button';

export const UserRents = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [rentedCars, setRentedCars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [visible, setVisible] = useState(false);
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

	const hideMenu = () => {
		setVisible(false);
	};
	const showMenu = () => {
		setVisible(true);
	};

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handleCancel = () => {
		hideMenu();
		toggleModal();
	};

	const handleCarDetails = (car) => {
		navigation.navigate('Details', { car, previus: 'UserRents' });
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
							<Car data={item.car} onPress={showMenu} />
							<MenuView>
								<Menu visible={visible} anchor={<Options onPress={showMenu} />} onRequestClose={hideMenu}>
									<MenuItemStyled onPress={() => handleCarDetails(item.car)}>Informaçõe do carro</MenuItemStyled>
									<MenuItemStyled onPress={hideMenu}>Editar Periodo</MenuItemStyled>
									<MenuItemStyled onPress={hideMenu}>Detalhes da reserva</MenuItemStyled>
									<MenuDivider />
									<MenuItemStyled onPress={handleCancel} pressColor={theme.colors.main}>
										Cancelar Reserva
									</MenuItemStyled>
								</Menu>
							</MenuView>
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
