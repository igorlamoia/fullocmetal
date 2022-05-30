import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
	/* flex: 1; */
	/* width: 100%; */
`;
export const IndexWrapper = styled.View`
	align-items: center;
	justify-content: flex-end;
	flex-direction: row;
	padding: 0 24px;
`;
export const CarImageWrapper = styled.View`
	width: ${Dimensions.get('window').width}px;
	justify-content: center;
	align-items: center;
	height: 133px;
`;
export const CarImage = styled.Image`
	width: 280px;
	height: 133px;
`;

export const Index = styled.View`
	width: 6px;
	height: 6px;
	border-radius: 3px;
	margin-left: 3px;
	background-color: ${({ theme, active }) => (active ? theme.colors.text : theme.colors.text_detail)};
`;
