import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LottieView from 'lottie-react-native';
import { FlatList } from 'react-native';
import NoCars from '../../assets/lottie/empty-garage.json';

export const ProfileWrapper = styled.View`
	flex-direction: row;
	align-content: flex-end;
	justify-content: flex-end;
	position: absolute;
	top: ${RFValue(45)}px;
	right: 15px;
	/* width: 100%; */
	/* flex: 1; */
`;

export const Container = styled.View`
	flex: 1;
`;
export const Header = styled.View`
	width: 100%;
	justify-content: space-between;
	height: ${RFValue(325)}px;
	background-color: ${({ theme }) => theme.colors.header};
	padding: ${getStatusBarHeight() + RFValue(80)}px 25px 32px;
`;

export const Title = styled.Text`
	font-size: ${RFValue(27)}px;
	font-family: ${({ theme }) => theme.fonts.secondary_600};
	color: ${({ theme }) => theme.colors.background_secondary};
	margin-bottom: 20px;
`;

export const Text = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.secondary_400};
	color: ${({ theme }) => theme.colors.text_detail};
`;

export const PeriodText = styled(Text)`
	font-size: ${RFValue(10)}px;
	text-transform: uppercase;
	width: 40%;
`;

export const TextDate = styled.Text`
	font-size: ${RFValue(13)}px;
	font-family: ${({ theme }) => theme.fonts.primary_400};
	color: ${({ theme }) => theme.colors.text};
`;

export const TextView = styled.View`
	padding: 24px 24px 10px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const PeriodView = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	padding: 5px 16px;
	background-color: ${({ theme }) => theme.colors.background_secondary};
	margin-top: -12px;
	margin-bottom: 15px;
`;

export const DateWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	width: 50%;
`;

export const FlatCars = styled(FlatList).attrs({
	contentContainerStyle: { padding: 16 },
	showsVerticalScrollIndicator: false,
})``;

export const NoCarsToShow = styled(LottieView).attrs({
	autoPlay: true,
	loop: true,
	source: NoCars,
})`
	height: 150px;
`;

export const NoCarsContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const Message = styled(Text)``;
export const NumberRents = styled(Text)`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	color: ${({ theme }) => theme.colors.title};
`;
