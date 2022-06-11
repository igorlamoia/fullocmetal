import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { createElement } from 'react';
import { MenuItem } from 'react-native-material-menu';

export const MenuIcon = styled(MaterialCommunityIcons).attrs((props) => ({
	color: props.theme.colors.title,
	name: 'car-cog',
	size: 24,
}))``;

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
