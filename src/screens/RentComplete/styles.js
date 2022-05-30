import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.header};
	justify-content: space-between;
	align-items: center;
	padding: ${getStatusBarHeight() + 20}px 0 80px;
`;
export const Text = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	color: ${({ theme }) => theme.colors.text_detail};
	font-size: ${RFValue(15)}px;
	text-align: center;
`;
export const Title = styled.Text`
	text-align: center;
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	color: ${({ theme }) => theme.colors.background_secondary};
	font-size: ${RFValue(30)}px;
	margin-top: 40px;
`;
export const ButtonBlock = styled.View`
	margin-top: 80px;
	width: 100px;
`;
