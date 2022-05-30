import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const CarButton = styled(RectButton)`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	background-color: ${({ theme }) => theme.colors.main};
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 15px;
	right: 15px;
`;
