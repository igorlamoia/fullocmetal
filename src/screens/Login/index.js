import React from 'react';
import { Container, ButtonWrapper, Content, Title, Description } from './styles';
import Logo from '../../assets/logo.svg';
import { LoginButton } from '../../components/LoginButton';
import { RFValue } from 'react-native-responsive-fontsize';

// import { View } from 'react-native';

const Login = () => {
	return (
		<Container>
			<Content>
				<Logo width={RFValue(120)} height={RFValue(120)} />
				<Title>Alugue carros {'\n'} sem complicações</Title>
				<Description>Faça seu login com {'\n'}uma das contas abaixo</Description>
			</Content>
			<ButtonWrapper>
				<LoginButton />
			</ButtonWrapper>
		</Container>
	);
};

export default Login;
