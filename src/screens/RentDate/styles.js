import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
	flex: 1;
	justify-content: space-between;
`;
export const Header = styled.View`
	width: 100%;
	height: ${RFValue(325)}px;
	background-color: ${({ theme }) => theme.colors.header};
	padding: ${getStatusBarHeight() + RFValue(80)}px 25px 32px;
`;

export const Title = styled.Text`
	font-size: ${RFValue(30)}px;
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	color: ${({ theme }) => theme.colors.background_secondary};
	margin-bottom: 20px;
`;
export const LineWrapper = styled.View`
	width: 100%;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Text = styled.Text`
	font-size: ${RFValue(10)}px;
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.text_detail};
	text-transform: uppercase;
`;

export const TextDate = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.background_secondary};
	${({ theme, selected }) =>
		!selected &&
		css`
			width: 33%;
			border-bottom-color: ${theme.colors.text_detail};
			border-bottom-width: 1px;
		`};
`;

export const Scroll = styled.ScrollView.attrs({
	contentContainerStyle: {
		paddingTop: 16,
	},
	showsVerticalScrollIndicator: false,
})`
	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const BlockButton = styled.View`
	padding: 24px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background_secondary};
`;
