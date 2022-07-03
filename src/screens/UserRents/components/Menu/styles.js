import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import { createElement } from 'react';
import { MenuItem } from 'react-native-material-menu';
import LottieView from 'lottie-react-native';
import close from '../../../../assets/lottie/x.json';
import Triste from '../../../../assets/lottie/sad-face.json';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const AnimatedContent = styled(Animated.View).attrs({
	entering: FadeInDown.delay(100).duration(2000),
})`
	padding: 20px 0;
`;

export const MenuIcon = styled(MaterialCommunityIcons).attrs((props) => ({
	color: props.theme.colors.title,
	name: 'car-cog',
	size: 24,
}))``;
export const ModalHeader = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 20px;
	align-items: center;
`;

export const ModalText = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.primary_400};
	color: ${({ theme }) => theme.colors.text_detail};
`;

export const ModalTitle = styled.Text`
	font-size: ${RFValue(20)}px;
	font-family: ${({ theme }) => theme.fonts.primary_400};
	color: ${({ theme }) => theme.colors.shape};
	text-align: center;
	flex: 1;
`;

export const ModalContainer = styled(GestureHandlerRootView)`
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

export const Options = styled(RectButton).attrs({
	children: [
		createElement(MenuIcon),
		// createReactElement(Variavel, {attrs}, chlidren),
	],
})`
	margin: 10px;
`;

export const MenuView = styled.View`
	position: absolute;
	width: 100%;
	flex-direction: row;
	justify-content: flex-end;
`;

export const MenuItemStyled = styled(MenuItem).attrs((props) => ({
	textStyle: {
		fontFamily: props.theme.fonts.secondary_400,
		color: props.theme.colors.title,
	},
}))``;

export const CloseModal = styled(LottieView).attrs({
	source: close,
	loop: true,
	autoPlay: true,
})`
	height: ${({ altura }) => RFValue(altura ?? 60)}px;
	width: ${({ largura }) => RFValue(largura ?? 60)}px;
`;
export const Tristinho = styled(LottieView).attrs({
	source: Triste,
	loop: true,
	autoPlay: true,
})`
	height: ${({ altura }) => RFValue(altura ?? 60)}px;
	width: ${({ largura }) => RFValue(largura ?? 60)}px;
`;
