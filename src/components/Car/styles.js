import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
	width: 100%;
	height: ${RFValue(150)}px;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.background_secondary};

	padding: ${RFValue(24)}px;
	margin-bottom: 15px;
`;
export const Brand = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(10)}px;
	color: ${({ theme }) => theme.colors.text_detail};
	text-transform: uppercase;
`;
export const Text = styled(Brand)``;

export const Model = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const Price = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.main};
	margin-right: 26px;
`;

export const Details = styled.View`
	height: 100%;
	justify-content: space-between;
`;

export const CarDetails = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const TextWrapper = styled.View``;

export const CarImage = styled.Image`
	width: 167px;
	height: 85px;
`;
