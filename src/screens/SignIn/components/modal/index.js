import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from '../../../../components/Button';
import { EmailButton, Input, InputWrapper } from '../../styles';
import { ForgetPassword, ModalContainer, ModalContent, SubTitle, Title, ButtonWrapper, ButtonModal } from './styles';
import Modal from 'react-native-modal';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import * as Yup from 'yup';
import { useGlobalContext } from '../../../../hooks/useGlobalVariables';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

// import { Container } from './styles';

let schemaModalValidation = Yup.object().shape({
	email: Yup.string().email('E-mail inválido :(').required('E-mail vazio -_- ai fica difícil kkkk'),
});

export const ModalPassword = ({ isVisible, closeModal }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const emailRef = useRef(null);
	const [isFocuedEmail, setIsFocuedEmail] = useState(false);
	const { showError, showSuccess } = useGlobalContext();

	const emailFocus = () => {
		emailRef?.current?.focus();
		setIsFocuedEmail(true);
	};

	const removeFocusEmail = () => {
		setIsFocuedEmail(false);
	};

	const forgotPassword = async () => {
		try {
			Keyboard.dismiss();
			setIsLoading(true);
			await schemaModalValidation.validate({ email });
			const auth = getAuth();
			sendPasswordResetEmail(auth, email)
				.then(() => {
					setIsLoading(false);
					setEmail('');
					showSuccess('E-mail de redefinição de senha foi enviado para ' + email);
				})
				.catch((error) => {
					// console.log(error);
					setIsLoading(false);
					// console.log(error.code);
					if (error.code === 'auth/user-not-found') {
						return showError('E-mail não cadastrado!');
					}
					showError('Erro inesperado :(');
					// ..
				});
		} catch (error) {
			setIsLoading(false);
			// console.log(error);
			if (error.name === 'ValidationError') {
				return showError(error.message);
			}
			// error.type === 'ValidationError'
		}
	};

	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={closeModal}
			// backdropColor="white"
			swipeDirection="down"
			onSwipeComplete={closeModal}
			onModalHide={closeModal}
			animationIn="fadeInUp"
			animationInTiming={500}
			// backdropOpacity={0.9}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ModalContainer>
					<ModalContent>
						<Title>Esqueceu?</Title>
						<ForgetPassword />
						<Title>Não tem problema!</Title>
						<SubTitle>Digite seu e-mail abaixo {'\n'}para redefir a senha</SubTitle>
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
								onSubmitEditing={forgotPassword}
							/>
						</InputWrapper>
						<ButtonWrapper>
							<ButtonModal enabled={!isLoading} title="Redefinir Senha" onPress={forgotPassword}></ButtonModal>
						</ButtonWrapper>
					</ModalContent>
				</ModalContainer>
			</TouchableWithoutFeedback>
		</Modal>
	);
};
