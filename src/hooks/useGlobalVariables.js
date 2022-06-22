import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
import * as AuthSession from 'expo-auth-session';

const GlobalContext = createContext({});

export const GlobalContextProvidader = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [splashLoaded, setSplashLoaded] = useState(false);
	const [userAuth, setUserAuth] = useState(false);

	const signInWithGoogle = async () => {
		try {
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
				// await AsyncStorage.setItem(storageUserKey, JSON.stringify(userLogged));
			}
		} catch (error) {
			console.log(error);
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<GlobalContext.Provider
			value={{ isLoading, setIsLoading, setSplashLoaded, splashLoaded, signInWithGoogle, userAuth }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
