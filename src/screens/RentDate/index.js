import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Calendar, DayProps, MarkedDatesProps } from '../../components/Calendar';
import SvgArrow from '../../assets/arrow.svg';
import { Container, Header, Title, LineWrapper, Text, TextDate, Scroll, BlockButton } from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { showDate } from '../../utils/format';

export const RentDate = () => {
	const route = useRoute();
	const { car } = route.params;
	const theme = useTheme();
	const navigation = useNavigation();

	const [lastSelectedDate, setLastSelectedDate] = useState({});
	const [selectedDate, setSelectedDate] = useState({});
	const [rentalPeriod, setRentalPeriod] = useState({});

	const handleDayChange = (date) => {
		let start = !!lastSelectedDate.timestamp ? lastSelectedDate : date;
		let end = date;

		if (start.timestamp > end.timestamp) [start, end] = [end, start];

		setLastSelectedDate(date);
		const interval = generateInterval(start, end);
		setRentalPeriod({
			formatStart: showDate(start.timestamp),
			formatEnd: showDate(end.timestamp),
		});
		setSelectedDate(interval);
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
			<Scroll>
				<Calendar onDayPress={handleDayChange} markedDates={selectedDate} />
			</Scroll>
			<BlockButton>
				<Button enabled={!!lastSelectedDate.timestamp} onPress={handleConfirm} title="Confirmar" />
			</BlockButton>
		</Container>
	);
};
