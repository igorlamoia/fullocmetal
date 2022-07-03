import styled, { css } from 'styled-components/native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import { createElement } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Road from '../../assets/lottie/cars-road.json';
import CarroUser from '../../assets/lottie/create-car.json';
import AnimatedLottieView from 'lottie-react-native';

export const RoadContainer = styled(AnimatedLottieView).attrs({
	autoPlay: true,
	loop: true,
	source: CarroUser,
	// height: 150,
	// width: 650,
})`
	opacity: 0.4;
`;

export const EmailButton = styled(RectButton).attrs(({ focused, filled, theme }) => {
	return {
		children: [
			createElement(MaterialCommunityIcons, {
				name: 'email-outline',
				color: (focused || filled) && theme.colors.main,
				size: 24,
			}),
			// createReactElement(Variavel, {attrs}, chlidren),
		],
	};
})`
	height: 100%;
	width: ${RFValue(55)}px;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background_secondary};
	margin-right: 2px;
`;
export const PasswordShowButton = styled.Pressable.attrs(({ show, theme }) => ({
	children: [
		createElement(Feather, {
			name: !show ? 'eye' : 'eye-off',
			size: 24,
		}),
		// createReactElement(Variavel, {attrs}, chlidren),
	],
}))`
	height: 100%;
	width: ${RFValue(55)}px;
	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.background_secondary};
	margin-right: 2px;
	${({ focused }) =>
		focused &&
		css`
			border-bottom-color: ${({ theme }) => theme.colors.main};
			border-bottom-width: 2px;
		`};
`;

export const InputWrapper = styled.View`
	flex-direction: row;
	width: 100%;
	height: ${RFValue(56)}px;
	margin-top: 10px;
`;

export const PasswordButton = styled(RectButton).attrs(({ theme, focused, filled }) => ({
	children: [
		createElement(AntDesign, {
			name: 'lock',
			color: (focused || filled) && theme.colors.main,
			size: 24,
		}),
		// createReactElement(Variavel, {attrs}, chlidren),
	],
}))`
	height: 100%;
	width: ${RFValue(55)}px;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background_secondary};
	margin-right: 2px;
	${({ focused }) =>
		focused &&
		css`
			border-bottom-color: ${({ theme }) => theme.colors.main};
			border-bottom-width: 2px;
		`};
`;

export const Container = styled(GestureHandlerRootView)`
	/* flex: 1; */
	padding: 0 24px;
	padding-top: ${RFValue(100) + getStatusBarHeight()}px;
	justify-content: space-around;
	/* align-items: center; */

	/* background-color: ${({ theme }) => theme.colors.background_primary}; */
`;
export const Form = styled.View`
	/* flex: 1; */
	/* width: 90%; */

	margin-top: ${RFValue(60)}px;

	border-top-left-radius: 20px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 20px;
`;

export const LogoWrapper = styled.View`
	width: 100%;
	align-items: center;
`;

export const Label = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme }) => theme.colors.text};
	font-size: ${RFValue(15)}px;
	/* text-align: center; */
`;

export const ButtonContainer = styled.View`
	margin-top: ${RFValue(24)}px;
`;

export const LabelLink = styled(Label)`
	margin-top: ${RFValue(10)}px;
	color: ${({ theme }) => theme.colors.text_detail};
	font-size: ${RFValue(13)}px;
	/* text-align: center; */
`;

export const Title = styled(Label)`
	font-size: ${RFValue(30)}px;
	color: ${({ theme }) => theme.colors.text_metal_logo};
`;
export const SubTitle = styled(Label)`
	margin-top: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.text_detail};
`;

export const ButtonLink = styled.Pressable`
	margin-top: 10px;
`;

export const Input = styled.TextInput`
	flex: 1;
	height: 100%;
	color: ${({ theme }) => theme.colors.title};
	background-color: ${({ theme }) => theme.colors.background_secondary};
	font-size: ${RFValue(15)}px;
	padding: 0 35px;
	${({ focused }) =>
		focused &&
		css`
			border-bottom-color: ${({ theme }) => theme.colors.main};
			border-bottom-width: 2px;
		`};
`;

export const ButtonWrapper = styled.View`
	margin-top: 10px;
`;
