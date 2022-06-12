import React from 'react';
import { StatusBar, View } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { InfoCard } from '../../components/InfoCard';
import { Button } from '../../components/Button';
import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated';

import {
	Container,
	LineWrapper,
	Carousel,
	Brand,
	Model,
	Text,
	Price,
	CarDetails,
	RentDetails,
	TextWrapper,
	TextInfo,
	ButtonBlock,
	ContentScrollAnimated,
	Header,
} from './styles';
import { Slider } from '../../components/Slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectSvg } from '../../utils/selectSvg';
import { priceReal } from '../../utils/format';

export const Details = () => {
	const route = useRoute();
	const { car, previus } = route.params;
	const navigation = useNavigation();
	// console.log(car);
	const handleChooseRentDate = () => {
		navigation.navigate('RentDate', { car });
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
							<Text>{car.rent.period}</Text>
							<Price>{priceReal(car.rent.price)}</Price>
						</RentDetails>
					</TextWrapper>
					<LineWrapper>
						{car.accessories.map((item) => (
							<InfoCard key={item.name} svg={selectSvg(item.type)} description={item.name} />
						))}
					</LineWrapper>
					<TextInfo>
						{car.about}
						{car.about}
						{car.about}
						{car.about}
						{car.about}
					</TextInfo>
				</ContentScrollAnimated>
				<ButtonBlock>
					{!!previus && <Button onPress={handleGoBack} title="Voltar" />}
					{!previus && <Button onPress={handleChooseRentDate} title="Escolher periodo do aluguel" />}
				</ButtonBlock>
			</Container>
		</>
	);
};
