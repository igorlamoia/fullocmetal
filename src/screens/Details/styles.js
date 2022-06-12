import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const ContentScrollAnimated = styled(Animated.ScrollView).attrs({
	contentContainerStyle: {
		// flex: 1,
		alignItems: 'center',
		padding: 24,
		paddingTop: getStatusBarHeight() + RFValue(115),
	},
	showsVerticalScrollIndicator: false,
})`
	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const TextBlock = styled.View`
	padding: 24px;
`;

export const Header = styled.View`
	height: ${getStatusBarHeight() + RFValue(45)}px;
`;

export const Carousel = styled(Animated.View)`
	justify-content: center;
	margin-top: ${getStatusBarHeight() + 24}px;
	overflow: hidden;
	position: absolute;
	z-index: 1;
`;

export const ImgCar = styled.Image`
	/* width: 100%; */
	height: ${RFValue(140)}px;
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
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const Price = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.main};
`;

export const CarDetails = styled.View`
	justify-content: space-between;
	/* align-items: center; */
`;

export const RentDetails = styled.View`
	/* height: 100%; */
	justify-content: space-between;
`;

export const TextWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 16px;
	width: 100%;
`;

export const LineWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: center;
	align-items: center;
`;

export const TextInfo = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	color: ${({ theme }) => theme.colors.text};
	font-size: ${RFValue(13)}px;
	line-height: ${RFValue(25)}px;
	margin-top: 20px;
	text-align: justify;
`;

export const ButtonBlock = styled.View`
	width: 100%;
	padding: 24px 24px ${getBottomSpace() + 24}px;
	background-color: ${({ theme }) => theme.colors.background_primary};
`;
