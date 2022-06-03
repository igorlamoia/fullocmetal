import React from 'react';
import SvgLogo from '../../assets/logo_background_gray.svg';
import SvgDone from '../../assets/done.svg';
import { useWindowDimensions } from 'react-native';
import { Container, Text, Title, ButtonBlock } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

export const RentComplete = () => {
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const theme = useTheme();

	const handlePress = () => {
		navigation.navigate('Home');
	};

	return (
		<Container>
			<SvgLogo width={width} />
			<SvgDone width={RFValue(70)} height={RFValue(72)} />
			<Title>Carro alugado!</Title>
			<Text>
				Agora você só precisa ir {'\n'}
				até a concessionária da Fulloc Metal{'\n'}
				pegar o seu automóvel.
			</Text>
			<ButtonBlock>
				<Button onPress={handlePress} title="Ok" color={theme.colors.shape_dark} />
			</ButtonBlock>
		</Container>
	);
};
