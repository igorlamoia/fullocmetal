import React, { useEffect, useState } from 'react';
import { Car } from '../../../../components/Car';
import {
	MenuView,
	MenuItemStyled,
	Options,
	Tristinho,
	ModalContainer,
	ModalTitle,
	ModalHeader,
	ModalText,
	AnimatedContent,
	CloseModal,
} from './styles';
import { Menu, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Text } from '../../styles';
import { Button } from '../../../../components/Button';
import { ref, remove } from 'firebase/database';
import { db } from '../../../../config/config';
import { useGlobalContext } from '../../../../hooks/useGlobalVariables';
import Modal from 'react-native-modal';
import { RectButton } from 'react-native-gesture-handler';
import { useAuthContext } from '../../../../hooks/useAuth';

const MenuCarRented = ({ item }) => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const { isLoading, setIsLoading } = useGlobalContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {
		userAuth: { id },
	} = useAuthContext();

	const hideMenu = () => {
		setVisible(false);
	};
	const showMenu = () => {
		setVisible(true);
	};

	const handleFireBaseRemove = async () => {
		try {
			setIsLoading(true);
			await remove(ref(db, `schedules_bycars/${item.car.id}/${item.id_reserva}`));
			await remove(ref(db, `schedules_byuser/${id}/${item.id_reserva}`));
			setIsLoading(false);
		} catch (erro) {
			setIsLoading(false);
			console.log(erro);
		}
	};

	const handleCancel = () => {
		hideMenu();
		setIsModalOpen(true);
		// item.id_reserva
	};

	const handleCarDetails = () => {
		hideMenu();
		navigation.navigate('Details', { car: item.car, previus: 'UserRents' });
	};

	const handleRentDetails = () => {
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

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Car data={item.car} onPress={showMenu} key={item.key} />
			<MenuView>
				<Menu visible={visible} anchor={<Options onPress={showMenu} />} onRequestClose={hideMenu}>
					<MenuItemStyled key={item.key + '1'} onPress={handleCarDetails}>
						Informaçõe do carro
					</MenuItemStyled>
					<MenuItemStyled key={item.key + '2'} onPress={handleRentDetails}>
						Detalhes da reserva
					</MenuItemStyled>
					<MenuDivider />
					<MenuItemStyled key={item.key + '3'} onPress={handleCancel} pressColor={theme.colors.main}>
						Cancelar Reserva
					</MenuItemStyled>
				</Menu>
			</MenuView>

			<Modal
				isVisible={isModalOpen}
				animationIn="fadeInUp"
				animationInTiming={500}
				onBackdropPress={handleCloseModal}
				backdropOpacity={0.9}
			>
				<ModalContainer>
					<ModalHeader>
						<ModalTitle>Deseja realmente cancelar?</ModalTitle>
						<RectButton onPress={handleCloseModal}>
							<CloseModal />
						</RectButton>
					</ModalHeader>

					<ModalText>Teremos outras oportunidades, lembre-se, aqui não tem burocracia!</ModalText>
					<AnimatedContent>
						<Tristinho />
					</AnimatedContent>
					<Button title="Confirmar" isLoading={isLoading} onPress={handleFireBaseRemove} />
				</ModalContainer>
			</Modal>
		</>
	);
};

export { MenuCarRented };
