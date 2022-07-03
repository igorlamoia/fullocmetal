import React from 'react';
import { BorderlessButton, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useGlobalContext } from '../../hooks/useGlobalVariables';
import { Button } from '../Button';

import { ModalContainer, ModalTitle, ModalHeader, ModalText, CloseModal } from './styles';

export const FullocModal = ({
	title,
	hasCloseIcon = false,
	body,
	justText,
	CloseIcon = null,
	onBackdropPress,
	...rest
}) => {
	const { isLoading } = useGlobalContext();
	return (
		<Modal
			// isVisible={isVisible}
			// onBackdropPress={handleCloseModal}
			swipeDirection="down"
			onSwipeComplete={onBackdropPress}
			onModalHide={onBackdropPress}
			animationIn="fadeInUp"
			animationInTiming={500}
			backdropOpacity={0.9}
			{...rest}
		>
			<GestureHandlerRootView>
				<ModalHeader>
					<ModalTitle>{title}</ModalTitle>
					{hasCloseIcon && (
						<BorderlessButton onPress={onBackdropPress}>
							{!CloseIcon && <CloseModal />}
							{!!CloseIcon && <CloseIcon />}
						</BorderlessButton>
					)}
				</ModalHeader>
				<ModalContainer>
					{body}
					<ModalText>{justText}</ModalText>
					<Button title="OK" isLoading={isLoading} onPress={onBackdropPress} />
				</ModalContainer>
			</GestureHandlerRootView>
		</Modal>
	);
};
