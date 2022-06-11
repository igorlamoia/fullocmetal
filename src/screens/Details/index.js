import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { InfoCard } from '../../components/InfoCard';
import { Button } from '../../components/Button';

import {
	Container,
	LineWrapper,
	Header,
	Brand,
	Model,
	Text,
	Price,
	CarDetails,
	RentDetails,
	TextWrapper,
	TextInfo,
	ButtonBlock,
	Content,
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

	return (
		<>
			<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
			<Container>
				<Header>
					<BackButton onPress={handleGoBack} />
				</Header>
				<Slider arrayUrl={car.photos} />
				<Content>
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
					<TextInfo>{car.about}</TextInfo>
				</Content>
				<ButtonBlock>
					{!!previus && <Button onPress={handleGoBack} title="Voltar" />}
					{!previus && <Button onPress={handleChooseRentDate} title="Escolher periodo do aluguel" />}
				</ButtonBlock>
			</Container>
		</>
	);
};
