import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from '../../components/Button';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	ButtonLink,
	Container,
	Form,
	Input,
	Label,
	LabelLink,
	LogoWrapper,
	ModalContainer,
	ModalContent,
} from './styles';
import { useAuthContext } from '../../hooks/useAuth';
import { useGlobalContext } from '../../hooks/useGlobalVariables';
import Logo from '../../assets/logo.svg';

export const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [toogleModal, setToogleModal] = useState(false);
	const { setUserAuth } = useAuthContext();
	const { showSuccess, showError } = useGlobalContext();

	const createUserOnFirebase = async () => {
		console.log('chamando');
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

	const signInWithFirebase = async () => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const userInfo = userCredential.user;
				const userLogged = {
					id: userInfo.uid,
					name: userInfo.providerData[0].displayName,
					email: userInfo.email,
					photo: userInfo.providerData[0].photoURL,
				};
				setUserAuth(userLogged);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				showError(errorMessage);
				console.log('errorCode', errorCode);
			});
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

	const openModal = () => {
		setToogleModal(true);
	};
	const closeModal = () => {
		setToogleModal(false);
	};

	return (
		<>
			<Container>
				<Form>
					<LogoWrapper>
						<Logo height={150} width={150} />
					</LogoWrapper>
					<Label>E-mail:</Label>
					<Input placeholder="E-mail" value={email} onChangeText={setEmail} />
					<Label>Senha:</Label>
					<Input placeholder="Senha" value={password} onChangeText={setPassword} />
					<Button title="Entrar" onPress={signInWithFirebase} />
					<ButtonLink onPress={openModal}>
						<LabelLink>Cadastrar</LabelLink>
					</ButtonLink>
					<ButtonLink onPress={forgotPassword}>
						<LabelLink>Esqueci Senha</LabelLink>
					</ButtonLink>
				</Form>
			</Container>
			<Modal
				isVisible={toogleModal}
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
				<ModalContainer>
					<ModalContent>
						<Text>Digite seu e-mail:</Text>
						<TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
						<Text>Digite seu e-mail:</Text>
						<TextInput placeholder="Senha" value={password} onChangeText={setPassword} />
						<GestureHandlerRootView>
							<Button title="Cadastrar" onPress={createUserOnFirebase} />
						</GestureHandlerRootView>
					</ModalContent>
				</ModalContainer>
			</Modal>
		</>
	);
};

// user Object {
//   "_redirectEventId": undefined,
//   "apiKey": "AIzaSyBjEfaLXH8_YLk36q8DCoBzu6B3NE6W7U0",
//   "appName": "[DEFAULT]",
//   "createdAt": "1656426807181",
//   "displayName": undefined,
//   "email": "igorlamoia@hotmail.com",
//   "emailVerified": false,
//   "isAnonymous": false,
//   "lastLoginAt": "1656428780705",
//   "phoneNumber": undefined,
//   "photoURL": undefined,
//   "providerData": Array [
//     Object {
//       "displayName": null,
//       "email": "igorlamoia@hotmail.com",
//       "phoneNumber": null,
//       "photoURL": null,
//       "providerId": "password",
//       "uid": "igorlamoia@hotmail.com",
//     },
//   ],
//   "stsTokenManager": Object {
//     "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4OTdjZjk0NTllMjU0ZmYxYzY3YTRlYjZlZmVhNTJmMjFhOWJhMTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZnVsbG9jLW1ldGFsIiwiYXVkIjoiZnVsbG9jLW1ldGFsIiwiYXV0aF90aW1lIjoxNjU2NDI4NzgwLCJ1c2VyX2lkIjoiYWl0V2MzMmtNWWFTWFRwSHVTdTVTRU4ycnF0MiIsInN1YiI6ImFpdFdjMzJrTVlhU1hUcEh1U3U1U0VOMnJxdDIiLCJpYXQiOjE2NTY0Mjg3ODAsImV4cCI6MTY1NjQzMjM4MCwiZW1haWwiOiJpZ29ybGFtb2lhQGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImlnb3JsYW1vaWFAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.OhFyi1RMS1OGRZAUDXbAGtwexvj1E8yfwsBy0gJCzHAUaUVIaH15dG-xfax0CQ0hPS_rjXPgJjPRhw3uRbkY4in4q6jQZfmnsy2qspC74zs6AnWzRmY9bD2I65PijxRGHCaOVdCJpc0TgoJTMwHZ30CcR77cMVs4yHh6AmyuIx99bQ1PtUpf1OvCqq-EZUYMSgZZhBx7vjdCLWvZ2jFeFmanbo-FVi5_2qC51s7fd3z5ZXVciKj9cx8uUXnhISADyYwrm-AXjCLACei6u1MyUIdINAQmdL-T83Xiq8GjvLsLMD_fjrWAEuTMhAsqkYxQmgqRnbAT6CccEJwU8Eba1w",
//     "expirationTime": 1656432381717,
//     "refreshToken": "AIwUaOkgb_bfS7pUtif-mv-zy8LSonzdrdIDXn9-OmDtyWhlGvL84yUIjAoK4Yv2cytBohsuZNnSl5La_-3zmttucWRQEahwJ2BzG_ZIG97rgn9xahDWluiU7uxyyitXr3o48Cu6y4vwO8SkRJuF7SuhPEtSh0vyTO7l1YQYJkdGvGDHpDLawtVcUdG2M5mCwO_9xKICvYyZwPdBffH0fcVusW9yIzb_rA",
//   },
//   "tenantId": undefined,
//   "uid": "aitWc32kMYaSXTpHuSu5SEN2rqt2",
// }
// ...
