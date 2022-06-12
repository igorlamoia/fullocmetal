import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';

import { Container, IndexWrapper, CarImageWrapper, CarImage, Index } from './styles';

export const Slider = ({ arrayUrl }) => {
	const [step, setStep] = useState(0);

	const handleImageChange = useRef((flatInfo) => {
		setStep(flatInfo.viewableItems[0].index);
	});

	return (
		<Container>
			<IndexWrapper>
				{arrayUrl.map((_, index) => (
					<Index key={index} active={index === step} />
				))}
			</IndexWrapper>
			<FlatList
				data={arrayUrl}
				renderItem={({ item }) => (
					<CarImageWrapper>
						<CarImage resizeMode="contain" source={{ uri: item }} />
					</CarImageWrapper>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={handleImageChange.current}
			/>
		</Container>
	);
};
