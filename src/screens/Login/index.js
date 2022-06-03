import React from 'react';
import { Container, ButtonWrapper, Content, Title, Description } from './styles';
import Logo from '../../assets/logo.svg';
import { LoginButton } from '../../components/LoginButton';
import { RFValue } from 'react-native-responsive-fontsize';
import SvgGoogle from '../../assets/google-login.svg';
import SvgEmail from '../../assets/email-login.svg';
// import { View } from 'react-native';

const Login = ({ navigation }) => {
	return (
		<Container>
			<Content>
				<Logo width={RFValue(150)} height={RFValue(150)} />
				<Title>Alugue carros {'\n'} sem complicações</Title>
				<Description>Faça seu login com {'\n'}uma das contas abaixo</Description>
			</Content>
			<ButtonWrapper>
				<LoginButton
					svg={SvgGoogle}
					title="Entrar com Google"
					onPress={() => {
						navigation.navigate('Home');
					}}
				/>
				<LoginButton
					svg={SvgEmail}
					title="Entrar com E-mail"
					onPress={() => {
						navigation.navigate('Home');
					}}
				/>
			</ButtonWrapper>
		</Container>
	);
};

export default Login;
