import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

export const ProfileImage = styled.Image`
	/* flex: 1; */
	width: ${RFValue(30)}px;
	height: ${RFValue(30)}px;
	border-radius: ${RFValue(15)}px;
`;

export const Logout = styled(AntDesign).attrs(({ theme }) => ({
	name: 'logout',
	size: RFValue(22),
	color: theme.colors.shape,
}))``;
export const Close = styled(AntDesign).attrs(({ theme }) => ({
	name: 'closecircleo',
	size: RFValue(22),
	color: theme.colors.shape,
}))``;

export const ToogleWrapper = styled(Animated.View).attrs({})`
	flex-direction: row;
	justify-content: space-between;
	border-radius: 30px;
	background-color: ${({ theme }) => theme.colors.title};
	align-items: center;
	padding: 2px;
`;
