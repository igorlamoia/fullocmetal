import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from '../../../../components/Button';
import { EmailButton, Input, InputWrapper } from '../../styles';
import { ForgetPassword, ModalContainer, ModalContent, SubTitle, Title, ButtonWrapper } from './styles';
import Modal from 'react-native-modal';
import { sendPasswordResetEmail } from 'firebase/auth';

// import { Container } from './styles';

export const ModalPassword = ({ isVisible, closeModal }) => {
	const [email, setEmail] = useState('');
	const emailRef = useRef(null);
	const [password, setPassword] = useState('');
	const passwordRef = useRef(null);
	const [isFocuedEmail, setIsFocuedEmail] = useState(false);
	const [isFocuedPassword, setIsFocuedPassword] = useState(false);

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

	const forgotPassword = async () => {
		const auth = getAuth();
		sendPasswordResetEmail(auth, email)
			.then(() => {
				showSuccess('E-mail de redefinição de senha foi enviado para ' + email);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				showError(errorMessage);
				// ..
			});
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
			style={{
				borderRadius: 20,
			}}
		>
			<GestureHandlerRootView>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ModalContainer>
						<ModalContent>
							<Title>Esqueceu?</Title>
							<ForgetPassword />
							<Title>Não tem problema!</Title>
							<SubTitle>Digite seu e-mail abaixo {'\n'}para redefir a senha</SubTitle>
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
							<ButtonWrapper>
								<Button title="Redefinir" onPress={forgotPassword} />
							</ButtonWrapper>
						</ModalContent>
					</ModalContainer>
				</ScrollView>
			</GestureHandlerRootView>
		</Modal>
	);
};
