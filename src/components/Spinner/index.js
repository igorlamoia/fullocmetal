import React from 'react';
import { CarSpinner, Container } from './styles';

export const Spinner = ({ size }) => {
	return (
		<Container>
			<CarSpinner size={size} />
		</Container>
	);
};
