import React, { createContext, useContext, useEffect, useState } from 'react';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from './useGlobalVariables';

const AuthContext = createContext({});
const USER_AUTH_DATA_KEY = '@fulloc-metal:user_id';

export const AuthProvider = ({ children }) => {
	const [userAuth, setUserAuth] = useState(false);
	const { setIsLoading } = useGlobalContext();

	const signInWithGoogle = async () => {
		try {
			// ! para forçar resultados
			// return setUserAuth({
			// 	email: 'igorlamoia@gmail.com',
			// 	id: '111726507287804207795',
			// 	name: 'Igor',
			// 	photo: 'https://lh3.googleusercontent.com/a-/AOh14GgJTxT9IUabvXLYwvYA6Djvf2CUAffr-DqwqqKhFiE=s96-c',
			// });
			setIsLoading(true);
			const RESPONSE_TYPE = 'token';
			const SCOPE = encodeURI('profile email');

			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

			const { type, params } = await AuthSession.startAsync({ authUrl });
			if (type === 'success') {
				const response = await fetch(
					`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
				);
				const userInfo = await response.json();
				const userLogged = {
					id: userInfo.id,
					name: userInfo.given_name,
					email: userInfo.email,
					photo: userInfo.picture,
				};
				setUserAuth(userLogged);
				await AsyncStorage.setItem(USER_AUTH_DATA_KEY, JSON.stringify(userLogged));
			}
		} catch (error) {
			console.log(error);
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const automaticLogin = async () => {
		setIsLoading(true);
		try {
			let user_data = await AsyncStorage.getItem(USER_AUTH_DATA_KEY);
			if (!!user_data) {
				user_data = JSON.parse(user_data);
				return setUserAuth(user_data);
			}
		} catch (erro) {
			console.log(erro);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		automaticLogin();
	}, []);

	const LogOut = async () => {
		setUserAuth(false);
		await AsyncStorage.removeItem(USER_AUTH_DATA_KEY);
	};

	return (
		<AuthContext.Provider
			value={{
				signInWithGoogle,
				userAuth,
				LogOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
