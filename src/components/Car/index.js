import React from 'react';
import { priceReal } from '../../utils/format';
import { selectSvg } from '../../utils/selectSvg';

import { Container, CarImage, Model, Text, Price, Details, TextWrapper, CarDetails, Brand } from './styles';

export const Car = ({ data, ...rest }) => {
	const SvgMotor = selectSvg(data.fuel_type);

	return (
		<Container {...rest}>
			<Details>
				<TextWrapper>
					<Brand>{data.brand}</Brand>
					<Model>{data.name}</Model>
				</TextWrapper>
				<TextWrapper>
					<Text>{data.rent.period}</Text>
					<CarDetails>
						<Price>{priceReal(data.rent.price)}</Price>
						<SvgMotor />
					</CarDetails>
				</TextWrapper>
			</Details>
			<CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
		</Container>
	);
};
