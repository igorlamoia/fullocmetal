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
	ProfileWrapper,
} from './styles';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import SvgArrow from '../../assets/arrow.svg';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/config';
import { Spinner } from '../../components/Spinner';

import { MenuCarRented } from './components/Menu';
import { useGlobalContext } from '../../hooks/useGlobalVariables';
import { ToogleMenu } from '../../components/ToogleMenu';

export const UserRents = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [rentedCars, setRentedCars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const {
		userAuth: { id, photo },
	} = useGlobalContext();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const getRentedCarsFromUser = () => {
		try {
			setIsLoading(true);
			onValue(ref(db, `schedules_byuser/${id}`), (snapshot) => {
				if (snapshot.exists()) {
					const reservas = snapshot.val();
					const arrayReservedCars = Object.values(reservas).map((reserva) => reserva);
					setRentedCars(arrayReservedCars);
				} else {
					setRentedCars([]);
				}
				setIsLoading(false);
			});
		} catch (error) {
			Alert.alert('Ops...', 'Algo de errado aconteceu');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getRentedCarsFromUser();
	}, []);

	return (
		<Container>
			<Header>
				<ProfileWrapper>
					<ToogleMenu />
				</ProfileWrapper>
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
							<MenuCarRented item={item} key={(item) => item.id_reserva} />
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
					keyExtractor={(item) => String(item.id_reserva)}
				/>
			)}
			{!isLoading && rentedCars.length === 0 && (
				<NoCarsContainer>
					<Message>Sua garagem está vazia!</Message>
					<NoCarsToShow />
				</NoCarsContainer>
			)}
		</Container>
	);
};
