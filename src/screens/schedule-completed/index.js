import React from 'react';
import { View, Button } from 'react-native';

export function ScheduleCompleted({ navigation: { navigate } }) {
	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<Button title="Voltar" onPress={() => navigate('Home')} />
		</View>
	);
}
