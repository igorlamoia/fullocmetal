import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Calendar } from '../../components/Calendar';
import SvgArrow from '../../assets/arrow.svg';
import { Container, Header, Title, LineWrapper, Text, TextDate, Scroll, BlockButton } from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { showDate } from '../../utils/format';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/config';
import { useGlobalContext } from '../../hooks/useGlobalVariables';
import { Spinner } from '../../components/Spinner';

export const RentDate = () => {
	const route = useRoute();
	const { car } = route.params;
	const theme = useTheme();
	const navigation = useNavigation();
	const [diasBloqueados, setDiasBloqueados] = useState({});
	const [lastSelectedDate, setLastSelectedDate] = useState({});
	const [selectedDate, setSelectedDate] = useState({});
	const [rentalPeriod, setRentalPeriod] = useState({});
	const { isLoading, setIsLoading } = useGlobalContext();

	const handleDayChange = (date) => {
		// Se a pessoa quiser desmarcar a única data que escolheu
		if (selectedDate[date.dateString] && Object.keys(selectedDate).length === 1) {
			setSelectedDate({});
			setRentalPeriod({});
			setLastSelectedDate({});
			return;
		}
		let start = !!lastSelectedDate.timestamp ? lastSelectedDate : date;
		let end = date;

		if (start.timestamp > end.timestamp) [start, end] = [end, start];
		if (
			hasBlockedDatesInBetweenStartAndEnd({ blockedDays: diasBloqueados, start: start.dateString, end: end.dateString })
		)
			return;
		setLastSelectedDate(date);
		const interval = generateInterval(start, end);
		setRentalPeriod({
			formatStart: showDate(start.timestamp),
			formatEnd: showDate(end.timestamp),
		});
		setSelectedDate(interval);
	};

	// Caso os dias escolhidos passem por algum dia já reservado, a função retorna true
	const hasBlockedDatesInBetweenStartAndEnd = ({ blockedDays, start, end }) => {
		start = Date.parse(start);
		end = Date.parse(end);
		return Object.keys(blockedDays).some((day) => start < Date.parse(day) && Date.parse(day) < end);
	};

	const handleConfirm = () => {
		navigation.navigate('RentDetailsScreen', {
			car,
			interval: {
				start: rentalPeriod.formatStart,
				end: rentalPeriod.formatEnd,
				size: Object.keys(selectedDate).length,
				period: Object.keys(selectedDate),
			},
		});
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const fetchData = async () => {
		try {
			setIsLoading(true);
			onValue(ref(db, `schedules_bycars/${car.id}`), (snapshot) => {
				if (snapshot.exists()) {
					let diasIndisponiveis = {};
					Object.values(snapshot.val()).forEach(({ unavailable_dates }) => {
						diasIndisponiveis = {
							...diasIndisponiveis,
							...unavailable_dates,
						};
					});
					let diasIndisponiveisFormatado = {};
					Object.values(diasIndisponiveis).forEach((day) => {
						let novo = {};
						novo[day] = {
							marked: true,
							disabled: true,
							disableTouchEvent: true,
							dotColor: 'red',
						};
						diasIndisponiveisFormatado = {
							...diasIndisponiveisFormatado,
							...novo,
						};
					});
					setDiasBloqueados(diasIndisponiveisFormatado);
					setIsLoading(false);
				} else {
					setIsLoading(false);
					console.log('No data available');
				}
			});
		} catch (error) {
			console.log('Olha o erro:', error);
			Alert.alert('Ops...');
			etIsLoading(false);
		} finally {
			// setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container>
			<Header>
				<BackButton onPress={handleGoBack} color={theme.colors.background_secondary} />
				<Title>
					Escolha uma {'\n'}
					data de início e {'\n'}
					fim do aluguel
				</Title>
				<LineWrapper>
					<Text>de</Text>
					<Text>até</Text>
				</LineWrapper>
				<LineWrapper>
					<TextDate selected={!!lastSelectedDate.timestamp}>{rentalPeriod.formatStart}</TextDate>
					<SvgArrow width="48" height="10" />
					<TextDate selected={!!lastSelectedDate.timestamp}>{rentalPeriod.formatEnd}</TextDate>
				</LineWrapper>
			</Header>
			{!isLoading && (
				<Scroll>
					<Calendar onDayPress={handleDayChange} markedDates={{ ...selectedDate, ...diasBloqueados }} />
				</Scroll>
			)}
			{isLoading && <Spinner size={200} />}
			<BlockButton>
				<Button enabled={!!lastSelectedDate.timestamp} onPress={handleConfirm} title="Confirmar" />
			</BlockButton>
		</Container>
	);
};
