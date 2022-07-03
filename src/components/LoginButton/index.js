import React from 'react';
import { CarSpinner } from '../Spinner/styles';

import { Container, Title, LogoWrapper, Content } from './styles';

const LoginButton = ({ svg: Svg, title, isLoading, ...rest }) => {
	return (
		<Container {...rest} enabled={!isLoading}>
			<LogoWrapper>
				<Svg />
			</LogoWrapper>
			<Content>
				{isLoading && <CarSpinner size={20} />}
				<Title isLoading>{title}</Title>
			</Content>
		</Container>
	);
};

export { LoginButton };
