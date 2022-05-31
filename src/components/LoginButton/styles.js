import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
	/* flex: 1; */
	height: ${RFValue(56)}px;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.shape};
	justify-content: space-between;
	flex-direction: row;
	border-radius: 5px;
	width: 100%;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.header};
	font-size: ${RFValue(12)}px;
	/* text-align: center; */
`;
