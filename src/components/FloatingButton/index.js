import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CarButton } from './styles';
import { useTheme } from 'styled-components';
import Animated, {
	useSharedValue,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

export const FloatingButton = ({ ...rest }) => {
	const theme = useTheme();
	const positionX = useSharedValue(0);
	const positionY = useSharedValue(0);

	const gestureButtonStyle = useAnimatedStyle(() => {
		if (!positionX.value || !positionY.value) {
			positionX.value = 0;
			positionY.value = 0;
		}
		return {
			transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
		};
	});

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: () => {
			// ctx.startX = positionX.value;
			// ctx.startY = positionY.value;
		},
		onActive: (event) => {
			positionX.value = event.translationX;
			positionY.value = event.translationY;
		},
		onEnd: () => {
			positionX.value = withSpring(0);
			positionY.value = withSpring(0);
		},
	});

	return (
		<PanGestureHandler onGestureEvent={onGestureEvent}>
			<CarButton {...rest} style={gestureButtonStyle}>
				<Ionicons name="ios-car-sport" size={35} color={theme.colors.background_secondary} />
			</CarButton>
		</PanGestureHandler>
	);
};
