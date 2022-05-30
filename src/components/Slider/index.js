import React, { useState } from 'react';

import { Container, IndexWrapper, CarImageWrapper, CarImage, Index } from './styles';

export const Slider = ({ imageUrl }) => {
	const [step, setStep] = useState(0);
	return (
		<Container>
			<IndexWrapper>
				{imageUrl.map((item, index) => (
					<Index key={index} active={index === step} />
				))}
			</IndexWrapper>

			<CarImageWrapper>
				<CarImage resizeMode="contain" source={{ uri: imageUrl[0] }} />
			</CarImageWrapper>
		</Container>
	);
};
