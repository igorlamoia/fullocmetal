import React, { useState } from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { InfoCard } from '../../components/InfoCard';
import { Button } from '../../components/Button';
import { Feather } from '@expo/vector-icons';

import {
	Container,
	LineWrapper,
	Header,
	Brand,
	Model,
	Price,
	CarDetails,
	RentDetails,
	TextWrapper,
	ButtonBlock,
	Content,
	Column,
	TextUpper,
	Text,
	TextDate,
	Line,
	CalendarButton,
	CalendarSelection,
} from './styles';
import { Slider } from '../../components/Slider';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectSvg } from '../../utils/selectSvg';
import { priceReal } from '../../utils/format';
import { ref, set } from 'firebase/database';
import { db } from '../../config/config';

export const RentDetailsScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const route = useRoute();
	const { car, interval } = route.params;
	const navigation = useNavigation();
	const theme = useTheme();

	const price = priceReal(car.rent.price);
	const totalPrice = priceReal(car.rent.price * interval.size);

	const handleRentComplete = async () => {
		try {
			const timestamp = new Date();
			const novoAluguel = {
				timestamp: new Date().getTime(),
				car,
				startDate: interval.start,
				endDate: interval.end,
				id_reserva: timestamp,
			};
			setIsLoading(true);
			// await api.post(`schedules_byuser`, { user_id: 1, car, startDate: interval.start, endDate: interval.end });
			// db.ref('schedules_byuser').child(2).set(cadastro);
			// await api.put(`schedules_bycars/${car.id}`, { id: car.id, unavailable_dates: interval.period });
			// !ID do usuário aqui
			const user = 'newUserkkk';
			await set(ref(db, `schedules_bycars/${car.id}/${timestamp}`), { unavailable_dates: interval.period, user: user });
			await set(ref(db, 'schedules_byuser/' + user + '/' + timestamp), {
				...novoAluguel,
			});

			setIsLoading(false);
			navigation.navigate('RentComplete');
		} catch (error) {
			// console.log('aa', error);
			setIsLoading(false);
			Alert.alert(
				'Ops... Algo de errado aconteceu',
				'Não foi possível reservar o seu carro, por favor, tente novamente mais tarde ou contate nosso suporte, caso o erro persista.'
			);
		}
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<>
			<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
			<Container>
				<Header>
					<BackButton onPress={handleGoBack} />
				</Header>
				<Slider imageUrl={car.photos} />
				<Content>
					<TextWrapper>
						<CarDetails>
							<Brand>{car.brand}</Brand>
							<Model>{car.name}</Model>
						</CarDetails>
						<RentDetails>
							<TextUpper>Ao dia</TextUpper>
							<Price>{price}</Price>
						</RentDetails>
					</TextWrapper>
					<LineWrapper>
						{car.accessories.map((item) => (
							<InfoCard key={item.name} svg={selectSvg(item.type)} description={item.name} />
						))}
					</LineWrapper>

					<CalendarSelection>
						<CalendarButton onPress={handleGoBack}>
							<Feather color={theme.colors.background_secondary} name="calendar" size={RFValue(24)} />
						</CalendarButton>
						<View>
							<Line>
								<TextUpper>de</TextUpper>
								<TextUpper>até</TextUpper>
							</Line>
							<Line>
								<TextDate>{interval.start}</TextDate>
								<Feather color={theme.colors.text_detail} name="chevron-right" size={20} />
								<TextDate>{interval.end}</TextDate>
							</Line>
						</View>
					</CalendarSelection>

					<TextWrapper>
						<Column>
							<TextUpper>Total</TextUpper>
							<Text>
								{price} x {interval.size} {interval.size > 1 ? 'diárias' : 'diária'}
							</Text>
						</Column>
						<Price color={theme.colors.success}>{totalPrice}</Price>
					</TextWrapper>
				</Content>
				<ButtonBlock>
					<Button
						isLoading={isLoading}
						enabled={!isLoading}
						onPress={handleRentComplete}
						title="Alugar agora"
						color={theme.colors.success}
					/>
				</ButtonBlock>
			</Container>
		</>
	);
};
