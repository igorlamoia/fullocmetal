import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { Splash } from '../screens/Splash';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import { useGlobalContext } from '../hooks/useGlobalVariables';
import { AppRoutes } from './app.routes';
import { FullocModal } from '../components/FullocModal';
import { useAuthContext } from '../hooks/useAuth';

export const Routes = () => {
	const { userAuth } = useAuthContext();
	const { splashLoaded, fullocModal } = useGlobalContext();

	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Archivo_400Regular,
		Archivo_500Medium,
		Archivo_600SemiBold,
	});

	if (!fontsLoaded || !splashLoaded) {
		return <Splash />;
	}
	return (
		<NavigationContainer>
			{!!userAuth ? <AuthRoutes /> : <AppRoutes />}
			<FullocModal {...fullocModal} />
		</NavigationContainer>
	);
};
