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
	Carousel,
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
	ContentScrollAnimated,
} from './styles';
import { Slider } from '../../components/Slider';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectSvg } from '../../utils/selectSvg';
import { priceReal } from '../../utils/format';
import { ref, set } from 'firebase/database';
import { db } from '../../config/config';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { useAuthContext } from '../../hooks/useAuth';
import { useGlobalContext } from '../../hooks/useGlobalVariables';
export const RentDetailsScreen = () => {
	const {
		userAuth: { id },
	} = useAuthContext();
	const { showError } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);
	const route = useRoute();
	const { car, interval, previus } = route.params;
	const navigation = useNavigation();
	const theme = useTheme();
	console.tron.log(route.params);
	const price = priceReal(car.rent.price);
	const totalPrice = priceReal(car.rent.price * interval.size);

	const handleRentComplete = async () => {
		try {
			const timestamp = new Date().getTime();
			const novoAluguel = {
				car,
				start: interval.start,
				end: interval.end,
				sizeInterval: interval.size,
				id_reserva: timestamp,
			};
			setIsLoading(true);
			const user = id;
			await set(ref(db, `schedules_bycars/${car.id}/${timestamp}`), {
				unavailable_dates: interval.period,
				user: user,
				id_reserva: timestamp,
			});
			await set(ref(db, 'schedules_byuser/' + user + '/' + timestamp), {
				...novoAluguel,
			});

			setIsLoading(false);
			navigation.navigate('RentComplete');
		} catch (error) {
			setIsLoading(false);
			showError(
				'Não foi possível reservar o seu carro, por favor, tente novamente mais tarde ou contate nosso suporte.'
			);
		}
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});
	const carouselStyleAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
		};
	});
	const sliderCarsAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolate.CLAMP),
		};
	});

	return (
		<>
			<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
			<Container>
				<Header>
					<BackButton onPress={handleGoBack} />
				</Header>
				<Carousel style={carouselStyleAnimation}>
					<Animated.View style={sliderCarsAnimation}>
						<Slider arrayUrl={car.photos} />
					</Animated.View>
				</Carousel>
				<ContentScrollAnimated onScroll={scrollHandler} scrollEventThrottle={16}>
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
				</ContentScrollAnimated>
				<ButtonBlock>
					{!previus && (
						<Button
							isLoading={isLoading}
							enabled={!isLoading}
							onPress={handleRentComplete}
							title="Alugar agora"
							color={theme.colors.success}
						/>
					)}
					{!!previus && <Button onPress={handleGoBack} title="Voltar" color={theme.colors.success} />}
				</ButtonBlock>
			</Container>
		</>
	);
};
