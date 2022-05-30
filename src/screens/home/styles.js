import styled from 'styled-components/native';

export const Title = styled.Text`
	/* font-size: 1.5e; */
	/* margin-top: 200px; */
	text-align: center;
	color: black;
`;
export const Container = styled.View`
	background-color: green;
	justify-content: center;
	align-items: center;
`;
export const Wrapper = styled.View`
	/* margin-top: 200px; */
	padding-top: 200px;
	background: ${(props) => props.theme.colors.primary};
`;

export const Button = styled.TouchableOpacity`
	background-color: blue;
	height: 56px;
	color: white;
`;

// export const Botao = styled.Button``;
