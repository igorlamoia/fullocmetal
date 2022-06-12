import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
	width: 100%;
	padding: 0 ${RFValue(10)}px;
	height: ${RFValue(56)}px;
	align-items: center;
	justify-content: center;
	opacity: ${({ enabled }) => (enabled ? 1 : 0.4)};
	background-color: ${({ theme, color }) => (color ? color : theme.colors.main)};
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme }) => theme.colors.background_secondary};
	font-size: ${RFValue(15)}px;
	text-align: center;
`;
