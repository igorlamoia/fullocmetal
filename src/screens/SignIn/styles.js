import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.shape_dark};
`;
export const ModalContainer = styled.View`
	/* flex: 1; */
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background_primary};
	padding: 20px;
	border-top-left-radius: 20px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 20px;
`;
export const ModalContent = styled.View`
	/* flex: 1; */
	width: 90%;
	/* background-color: ${({ theme }) => theme.colors.background_secondary}; */
	padding: 20px;
	border-top-left-radius: 20px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 20px;
`;
export const Form = styled.View`
	/* flex: 1; */
	width: 90%;
	background-color: ${({ theme }) => theme.colors.background_secondary};
	padding: 20px;
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
	color: ${({ theme }) => theme.colors.title};
	font-size: ${RFValue(15)}px;
	/* text-align: center; */
`;
export const LabelLink = styled(Label)`
	color: ${({ theme }) => theme.colors.main};
	/* font-size: ${RFValue(15)}px; */
	text-align: center;
`;

export const ButtonLink = styled.Pressable`
	margin-top: 10px;
`;

export const Input = styled.TextInput`
	width: 100%;
	height: ${RFValue(56)}px;
	color: ${({ theme }) => theme.colors.title};
`;
