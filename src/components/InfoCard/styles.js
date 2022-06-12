import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.background_primary};
	width: 30%;
	height: ${RFValue(92)}px;
	align-items: center;
	justify-content: center;

	padding: 16px;
	margin: 3px;
`;

export const Description = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(12)}px;
	color: ${({ theme }) => theme.colors.text};
	margin-top: 14px;
	text-align: center;
`;
