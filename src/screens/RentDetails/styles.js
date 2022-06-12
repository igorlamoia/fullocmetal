import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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
	/* background-color: ${({ theme }) => theme.colors.main}; */
`;

// export const Container = styled.View`
// 	flex: 1;
// 	background-color: ${({ theme }) => theme.colors.background_secondary};
// `;

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
export const TextUpper = styled(Brand)``;

export const Model = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const Price = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(20)}px;
	color: ${({ theme, color }) => color ?? theme.colors.main};
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
	align-items: flex-end;
	padding: 10px 16px;
	width: 100%;
`;

export const LineWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: center;
	align-items: center;
`;

export const Text = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_500};
	color: ${({ theme }) => theme.colors.title};
	font-size: ${RFValue(12)}px;
`;

export const ButtonBlock = styled.View`
	width: 100%;
	padding: 24px 24px ${getBottomSpace() + 24}px;
	background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Column = styled.View``;

export const TextDate = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.title};
`;

export const Line = styled.View`
	/* width: 100%; */

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const CalendarButton = styled(RectButton)`
	background-color: ${({ theme }) => theme.colors.main};
	padding: ${RFValue(14)}px;
`;

export const CalendarSelection = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	margin: 40px 0 16px;
	border-bottom-color: ${({ theme }) => theme.colors.background_primary};
	border-bottom-width: 1px;
`;
