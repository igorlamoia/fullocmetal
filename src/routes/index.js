import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/home';
import { ScheduleCompleted } from '../screens/schedule-completed';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Screen name="Home" component={Home} />
				<Screen name="ScheduleCompleted" component={ScheduleCompleted} />
			</Navigator>
		</NavigationContainer>
	);
}
