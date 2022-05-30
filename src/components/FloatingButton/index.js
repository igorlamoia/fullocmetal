import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { CarButton } from './styles';
import { useTheme } from 'styled-components';
export const FloatingButton = ({ ...rest }) => {
	const theme = useTheme();

	return (
		<CarButton {...rest}>
			<Ionicons name="ios-car-sport" size={35} color={theme.colors.background_secondary} />
		</CarButton>
	);
};
