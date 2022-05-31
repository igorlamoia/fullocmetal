import React from 'react';

import { Container, Title } from './styles';
import Logo from '../../assets/logo.svg';

const LoginButton = ({ ...rest }) => {
	return (
		<Container {...rest}>
			<Logo />
			<Title>Entrar com Google</Title>
		</Container>
	);
};

export { LoginButton };
