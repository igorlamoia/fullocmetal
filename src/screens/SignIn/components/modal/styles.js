import styled from 'styled-components/native';
import Forget from '../../../../assets/lottie/forgot.json';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(20)}px;
`;
export const SubTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme }) => theme.colors.text};
	font-size: ${RFValue(15)}px;
	margin-top: 10px;
	margin-bottom: 20px;
`;

export const Container = styled.View`
	flex: 1;
`;
export const ForgetPassword = styled(LottieView).attrs({
	autoPlay: true,
	loop: true,
	source: Forget,
	// height: 150,
})`
	height: ${RFValue(150)}px;
	align-self: center;
`;

export const ModalContainer = styled.View`
	/* flex: 1; */
	/* justify-content: center; */
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background_primary};
	padding: 20px 5px;
	/* border-top-left-radius: 20px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 20px; */
`;
export const ModalContent = styled.View`
	/* flex: 1; */
	/* align-items: center; */
	width: 90%;
	/* background-color: ${({ theme }) => theme.colors.background_secondary}; */
	/* padding: 20px; */
	/* border-top-left-radius: 20px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 20px; */
`;
export const ButtonWrapper = styled.View`
	margin-top: 20px;
`;
