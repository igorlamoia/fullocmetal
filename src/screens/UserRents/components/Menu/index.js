import React, { useState } from 'react';
import { Car } from '../../../../components/Car';
import { MenuView, MenuItemStyled, Options } from './styles';
import { Menu, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { View } from 'react-native';
import { Text } from '../../styles';
import { Button } from '../../../../components/Button';
import { ref, remove } from 'firebase/database';
import { db } from '../../../../config/config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const user = 'newUserkkk';

const MenuCarRented = ({ item, toggleModal }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const hideMenu = () => {
		setVisible(false);
	};
	const showMenu = () => {
		setVisible(true);
	};

	const handleFireBaseRemove = async (item) => {
		try {
			setIsLoading(true);
			await remove(ref(db, `schedules_bycars/${item.car.id}/${item.id_reserva}`));
			await remove(ref(db, `schedules_byuser/${user}/${item.id_reserva}`));
		} catch (erro) {
			console.log(erro);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = (item) => {
		hideMenu();
		// item.id_reserva
		toggleModal({
			visible: true,
			body: (
				<GestureHandlerRootView style={{ backgroundColor: 'white', height: '50%' }}>
					<Text>X</Text>
					<Text>Deseja realmente cancelar?</Text>
					<Text>Você pode editar a data agendada de acordo com sua </Text>
					<Button title="Cancelar" isLoading={isLoading} onPress={() => handleFireBaseRemove(item)} />
				</GestureHandlerRootView>
			),
		});
	};

	const handleCarDetails = (car) => {
		hideMenu();
		navigation.navigate('Details', { car, previus: 'UserRents' });
	};

	const handleRentDetails = (item) => {
		hideMenu();
		navigation.navigate('RentDetailsScreen', {
			car: item.car,
			interval: {
				start: item.start,
				end: item.end,
				size: item.sizeInterval,
			},
			previus: 'UserRents',
		});
	};

	return (
		<>
			<Car data={item.car} onPress={showMenu} />
			<MenuView>
				<Menu visible={visible} anchor={<Options onPress={showMenu} />} onRequestClose={hideMenu}>
					<MenuItemStyled onPress={() => handleCarDetails(item.car)}>Informaçõe do carro</MenuItemStyled>
					<MenuItemStyled onPress={() => handleRentDetails(item)}>Detalhes da reserva</MenuItemStyled>
					<MenuItemStyled onPress={hideMenu}>Editar Periodo</MenuItemStyled>
					<MenuDivider />
					<MenuItemStyled onPress={() => handleCancel(item)} pressColor={theme.colors.main}>
						Cancelar Reserva
					</MenuItemStyled>
				</Menu>
			</MenuView>
		</>
	);
};

export { MenuCarRented };
