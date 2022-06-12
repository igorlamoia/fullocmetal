import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const CarButton = styled(Animated.createAnimatedComponent(RectButton))`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	background-color: ${({ theme }) => theme.colors.main};
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 1;
	bottom: 15px;
	right: 15px;
`;
