import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import { SignIn } from '../screens/SignIn';
const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name="Login" component={Login} />
			<Screen name="SignIn" component={SignIn} />
		</Navigator>
	);
};
