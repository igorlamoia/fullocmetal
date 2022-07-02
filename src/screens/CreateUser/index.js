import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
	ButtonContainer,
	ButtonWrapper,
	Container,
	EmailButton,
	Form,
	Input,
	InputWrapper,
	PasswordButton,
	PasswordShowButton,
	SubTitle,
	Title,
} from './styles';
import { useGlobalContext } from '../../hooks/useGlobalVariables';
import { BackButton } from '../../components/BackButton';

export const CreateUser = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const emailRef = useRef(null);
	const [password, setPassword] = useState('');
	const passwordRef = useRef(null);
	const [isFocuedEmail, setIsFocuedEmail] = useState(false);
	const [isFocuedPassword, setIsFocuedPassword] = useState(false);

	const { showSuccess, showError } = useGlobalContext();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const createUserOnFirebase = async () => {
		// console.log('chamando');
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				showError(errorMessage);
				// ..
			});
	};

	const emailFocus = () => {
		emailRef?.current?.focus();
		setIsFocuedEmail(true);
	};
	const passwordFocus = () => {
		passwordRef?.current?.focus();
		setIsFocuedPassword(true);
	};
	const removeFocusEmail = () => {
		setIsFocuedEmail(false);
	};
	const removeFocusPassword = () => {
		setIsFocuedPassword(false);
	};

	return (
		<>
			<BackButton onPress={() => navigation.goBack()} />
			<ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
				<KeyboardAvoidingView behavior="position">
					<Container>
						<Title>Crie sua {'\n'}conta</Title>
						<SubTitle>
							Faça seu cadastro de{'\n'}
							forma rápida e fácil.
						</SubTitle>
						<Form>
							{/* <LogoWrapper>
						<Logo height={150} width={150} />
					</LogoWrapper> */}

							<InputWrapper>
								{/* <Label>E-mail:</Label> */}
								<EmailButton focused={isFocuedEmail || !!email} key={'email'} onPress={emailFocus} />
								<Input
									focused={isFocuedEmail}
									onBlur={removeFocusEmail}
									onFocus={emailFocus}
									placeholder="E-mail"
									keyboardType="email-address"
									value={email}
									autoCorrect={false}
									autoCapitalize="none"
									onChangeText={setEmail}
									ref={emailRef}
								/>
							</InputWrapper>
							<InputWrapper>
								{/* <Label>Senha:</Label> */}
								<PasswordButton focused={isFocuedPassword || !!password} key={'senha'} onPress={passwordFocus} />
								<Input
									focused={isFocuedPassword}
									onBlur={removeFocusPassword}
									onFocus={passwordFocus}
									secureTextEntry={isPasswordVisible}
									placeholder="Senha"
									value={password}
									onChangeText={setPassword}
									ref={passwordRef}
									autoCapitalize="none"
								/>
								<PasswordShowButton
									focused={isFocuedPassword}
									show={isPasswordVisible}
									onPress={() => setIsPasswordVisible(!isPasswordVisible)}
								/>
							</InputWrapper>

							<ButtonContainer>
								<ButtonWrapper>
									<Button title="Cadastrar" onPress={createUserOnFirebase} />
								</ButtonWrapper>
							</ButtonContainer>
						</Form>
					</Container>
				</KeyboardAvoidingView>
			</ScrollView>
		</>
	);
};
