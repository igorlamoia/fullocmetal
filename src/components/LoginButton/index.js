import React from 'react';

import { Container, Title, LogoWrapper } from './styles';

const LoginButton = ({ svg: Svg, title, ...rest }) => {
	return (
		<Container {...rest}>
			<LogoWrapper>
				<Svg />
			</LogoWrapper>
			<Title>{title}</Title>
		</Container>
	);
};

export { LoginButton };
