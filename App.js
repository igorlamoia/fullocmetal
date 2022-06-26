import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { StatusBar } from 'react-native';
import React from 'react';
import theme from './src/styles/theme';

import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Alert } from './src/components/Alert';
import { ContextProviderWrapper } from './src/hooks';

if (__DEV__) {
	import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
	return (
		<>
			<ContextProviderWrapper>
				<ThemeProvider theme={theme}>
					<StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
					<GestureHandlerRootView style={{ flex: 1 }}>
						<Routes />
					</GestureHandlerRootView>
					<Alert />
				</ThemeProvider>
			</ContextProviderWrapper>
		</>
	);
}
