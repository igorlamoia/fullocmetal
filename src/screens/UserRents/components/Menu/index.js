import React, { useState } from 'react';
import { Car } from '../../../../components/Car';
import { MenuView, MenuItemStyled, Options } from './styles';
import { Menu, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

const MenuCarRented = ({ item, toggleModal }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const hideMenu = () => {
		setVisible(false);
	};
	const showMenu = () => {
		setVisible(true);
	};

	const handleToggle = () => {
		hideMenu();
		toggleModal();
	};

	const handleCarDetails = (car) => {
		hideMenu();
		navigation.navigate('Details', { car, previus: 'UserRents' });
	};
	const handleRentDetails = (item) => {
		// console.tron.log(car);
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
					<MenuItemStyled onPress={handleToggle} pressColor={theme.colors.main}>
						Cancelar Reserva
					</MenuItemStyled>
				</Menu>
			</MenuView>
		</>
	);
};

export { MenuCarRented };
