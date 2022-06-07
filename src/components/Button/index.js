import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

export const Button = ({ title, color, isLoading, enabled = true, ...rest }) => {
	const theme = useTheme();
	return (
		<Container enabled={enabled} color={color} {...rest}>
			{isLoading && <ActivityIndicator size="large" color={theme.colors.main} />}
			{!isLoading && <Title>{title}</Title>}
		</Container>
	);
};
