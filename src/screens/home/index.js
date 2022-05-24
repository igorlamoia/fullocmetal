import React, { useEffect } from 'react';
import { api } from '../../utils/api';
import { Title, Wrapper, Button } from './styles';

export function Home({navigation: {navigate}}) {
	async function getDados() {
		try {
			const { data } = await api.get('01001000/json/');
			console.log(data);
		} catch (erro) {
			console.log(erro);
		}
	}

	useEffect(() => {
		// getDados();
	}, []);

	return (
		<>
			<Wrapper>
				<Title>Hello World!</Title>
			</Wrapper>
			<Button onPress={() => navigate('ScheduleCompleted')}>
				<Title>Ir para Schedule</Title>
			</Button>
		</>
	);
}
