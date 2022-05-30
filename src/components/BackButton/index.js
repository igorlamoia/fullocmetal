import React from 'react';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from './styles';

export const BackButton = ({ color, ...rest }) => {
	const theme = useTheme();
	return (
		<Button {...rest}>
			<MaterialIcons name="chevron-left" color={color ?? theme.colors.text} size={24} />
		</Button>
	);
};
