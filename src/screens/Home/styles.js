import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import NoConnection from '../../assets/lottie/no-connection.json';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background_primary};
	align-items: center;
	justify-content: center;
`;

export const ProfileImage = styled.Image`
	/* flex: 1; */
	width: ${RFValue(30)}px;
	height: ${RFValue(30)}px;
	border-radius: ${RFValue(15)}px;
`;

export const ProfileWrapper = styled.View`
	flex-direction: row;
	align-content: flex-end;
	justify-content: flex-end;
	/* width: 100%; */
	/* flex: 1; */
`;

export const HeaderWrapper = styled.View`
	flex: 1;
	height: 100%;
	padding: ${RFValue(15)}px 0;
	justify-content: space-evenly;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.main};
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: 50px;
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;

	background-color: ${({ theme }) => theme.colors.header};

	justify-content: center;
	/* flex-direction: row; */
	/* align-items: space-between; */
	/* justify-content: flex-end; */
	padding: 30px 20px;
`;

export const HeaderContent = styled.View`
	/* background-color: red; */
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const TotalCars = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.text_detail};
	text-align: right;
`;

export const FlatCars = styled(FlatList).attrs({
	contentContainerStyle: { padding: 16 },
	showsVerticalScrollIndicator: false,
})``;

export const NoConnectionSVG = styled(LottieView).attrs({
	autoPlay: true,
	loop: true,
	source: NoConnection,
})`
	height: 150px;
`;
