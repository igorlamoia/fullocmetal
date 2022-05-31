import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { StatusBar } from 'react-native';
import React from 'react';

import AppLoading from 'expo-app-loading';
import theme from './src/styles/theme';

import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Login from './src/screens/Login';

export default function App() {
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Archivo_400Regular,
		Archivo_500Medium,
		Archivo_600SemiBold,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<>
			<ThemeProvider theme={theme}>
				<StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
				<GestureHandlerRootView style={{ flex: 1 }}>
					{/* <Routes /> */}
					<Login />
				</GestureHandlerRootView>
			</ThemeProvider>
		</>
	);
}
