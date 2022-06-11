import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Title } from './styles';

export const Button = ({ title, color, isLoading, enabled = true, ...rest }) => {
	return (
		<Container enabled={!isLoading && enabled} color={color} {...rest}>
			{isLoading && <ActivityIndicator size="large" color="white" />}
			{!isLoading && <Title>{title}</Title>}
		</Container>
	);
};
