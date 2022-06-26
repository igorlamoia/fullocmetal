import AnimatedLottieView from 'lottie-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import close from '../../assets/lottie/x.json';

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

export const CloseModal = styled(AnimatedLottieView).attrs({
	source: close,
	loop: true,
	autoPlay: true,
})`
	height: ${({ altura }) => RFValue(altura ?? 60)}px;
	width: ${({ largura }) => RFValue(largura ?? 60)}px;
`;
