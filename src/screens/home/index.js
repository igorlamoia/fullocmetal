import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { Title, Wrapper, Button, Container } from './styles';
import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';
import { FlatList } from 'react-native';
export function Home({ navigation: { navigate } }) {
	const [cars, setCars] = useState([]);
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

	async function handleTeste() {
		const dbRef = ref(getDatabase());
		get(child(dbRef, 'cars/'))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setCars(snapshot.val());
				} else {
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<>
			<Wrapper>
				<Title>Hello World!</Title>
			</Wrapper>
			{/* <Button onPress={() => navigate('ScheduleCompleted')}> */}
			<Button onPress={handleTeste}>
				<Title>Ir para Schedule</Title>
			</Button>
			<FlatList
				data={cars}
				renderItem={({ item }) => (
					<Container>
						<Title>{item.brand}</Title>
					</Container>
				)}
			/>
		</>
	);
}
