import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background_metal};
`;

export const Content = styled.View`
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	height: 70%;
	padding: 5%;
	background-color: ${({ theme }) => theme.colors.header};
`;
export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.text_metal_logo};
	font-size: ${RFValue(25)}px;
	text-align: center;
	/* margin-top: -50px; */
`;

export const Description = styled(Title)`
	font-family: ${({ theme }) => theme.fonts.secondary_400};
	font-size: ${RFValue(14)}px;
`;

export const ButtonWrapper = styled.View`
	margin-top: -10%;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 0px 5%;
`;
