import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { RentDate } from '../screens/RentDate';
import { RentDetailsScreen } from '../screens/RentDetails';
import { RentComplete } from '../screens/RentComplete';
import { UserRents } from '../screens/UserRents';
import Login from '../screens/Login';

const { Navigator, Screen } = createNativeStackNavigator();

export const StackRoutes = () => {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name="Login" component={Login} />
			<Screen name="Home" component={Home} />
			<Screen name="Details" component={Details} />
			<Screen name="RentDate" component={RentDate} />
			<Screen name="RentDetailsScreen" component={RentDetailsScreen} />
			<Screen name="RentComplete" component={RentComplete} />
			<Screen name="UserRents" component={UserRents} />
		</Navigator>
	);
};
