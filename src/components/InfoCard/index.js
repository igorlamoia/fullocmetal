import React from 'react';
import { Container, Description } from './styles';

export const InfoCard = ({ svg: Svg, description }) => {
	return (
		<Container>
			<Svg width="24" height="28" />
			<Description>{description}</Description>
		</Container>
	);
};
