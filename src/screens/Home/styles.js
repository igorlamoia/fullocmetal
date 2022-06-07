import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background_primary};
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
`;

export const FlatCars = styled(FlatList).attrs({
	contentContainerStyle: { padding: 16 },
	showsVerticalScrollIndicator: false,
})``;
