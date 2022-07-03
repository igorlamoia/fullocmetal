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
	RoadContainer,
	SubTitle,
	Title,
} from './styles';
import { useGlobalContext } from '../../hooks/useGlobalVariables';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { useAuthContext } from '../../hooks/useAuth';

let schemaValidationForm = Yup.object().shape({
	email: Yup.string().email('E-mail inválido :(').required('E-mail vazio -_- ai fica difícil'),
	password: Yup.string()
		.required('Senha é obrigatória!')
		.min(6, 'A senha deve ter no mínimo 6 caracteres')
		.max(16, 'A senha deve ter no máximo 16 caracteres'),
	passwordConfirmation: Yup.string()
		.oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais!')
		.required('Confirmação de senha é obrigatória'),
});

export const CreateUser = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const emailRef = useRef(null);
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const passwordRef = useRef(null);
	const passwordConfirmationRef = useRef(null);
	const [isFocuedEmail, setIsFocuedEmail] = useState(false);
	const [isFocuedPassword, setIsFocuedPassword] = useState(false);
	const [isFocuedPasswordConfirmation, setIsFocuedPasswordConfirmation] = useState(false);
	const theme = useTheme();

	const { setUserAuth } = useAuthContext();
	const { showSuccess, showError } = useGlobalContext();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const createUserOnFirebase = async () => {
		// console.log('chamando');
		try {
			setIsLoading(true);
			await schemaValidationForm.validate({ email, password, passwordConfirmation }, { abortEarly: false });
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					setIsLoading(false);
					setEmail('');
					setPassword('');
					setPasswordConfirmation('');
					const userInfo = userCredential.user;
					const userLogged = {
						id: userInfo.uid,
						name: userInfo.providerData[0].displayName,
						email: userInfo.email,
						photo: userInfo.providerData[0].photoURL,
					};
					setUserAuth(userLogged);
					// Signed in
					// console.log(user);
					// ...
				})
				.catch((error) => {
					setIsLoading(false);

					const errorCode = error.code;
					const errorMessage = error.message;
					showError(errorMessage);
					// ..
				});
		} catch (error) {
			setIsLoading(false);

			if (error.name === 'ValidationError') {
				let errorsMessage = '';
				error.errors.forEach((erro) => {
					errorsMessage += erro + '\n';
				});
				return showError(errorsMessage);
			}
		}
	};

	const emailFocus = () => {
		emailRef?.current?.focus();
		setIsFocuedEmail(true);
	};
	const passwordFocus = () => {
		passwordRef?.current?.focus();
		setIsFocuedPassword(true);
	};
	const passwordFocusConfirmation = () => {
		passwordConfirmationRef?.current?.focus();
		setIsFocuedPasswordConfirmation(true);
	};
	const removeFocusPassword = () => {
		setIsFocuedPassword(false);
	};
	const removeFocusPasswordConfirmation = () => {
		setIsFocuedPasswordConfirmation(false);
	};
	const removeFocusEmail = () => {
		setIsFocuedEmail(false);
	};

	return (
		<>
			<ScrollView style={{ backgroundColor: theme.colors.header }} showsVerticalScrollIndicator={false}>
				<KeyboardAvoidingView behavior="position">
					<BackButton onPress={() => navigation.goBack()} />
					<Container>
						<RoadContainer />
						<Title>Crie sua {'\n'}conta grátis :)</Title>
						<SubTitle>
							Faça seu cadastro de{'\n'}
							forma rápida e fácil.
						</SubTitle>
						<Form>
							{/* <LogoWrapper>
						<Logo height={150} width={150} />
					</LogoWrapper> */}

							<InputWrapper>
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
								<PasswordButton focused={isFocuedPassword || !!password} key={'senha'} onPress={passwordFocus} />
								<Input
									focused={isFocuedPassword}
									onBlur={removeFocusPassword}
									onFocus={passwordFocus}
									secureTextEntry={!isPasswordVisible}
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
							<InputWrapper>
								<PasswordButton
									focused={isFocuedPasswordConfirmation || !!password}
									key={'senha'}
									onPress={passwordFocusConfirmation}
								/>
								<Input
									focused={isFocuedPasswordConfirmation}
									onBlur={removeFocusPasswordConfirmation}
									onFocus={passwordFocusConfirmation}
									secureTextEntry={!isPasswordVisible}
									placeholder="Confirme senha"
									value={passwordConfirmation}
									onChangeText={setPasswordConfirmation}
									ref={passwordConfirmationRef}
									autoCapitalize="none"
									onSubmitEditing={createUserOnFirebase}
								/>
								<PasswordShowButton
									focused={isFocuedPasswordConfirmation}
									show={isPasswordVisible}
									onPress={() => setIsPasswordVisible(!isPasswordVisible)}
								/>
							</InputWrapper>

							<ButtonContainer>
								<ButtonWrapper>
									<Button isLoading={isLoading} title="Cadastrar" onPress={createUserOnFirebase} />
								</ButtonWrapper>
							</ButtonContainer>
						</Form>
					</Container>
				</KeyboardAvoidingView>
			</ScrollView>
		</>
	);
};
