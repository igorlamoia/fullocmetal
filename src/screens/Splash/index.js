import React, { useEffect } from 'react';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolate,
	Extrapolate,
	runOnJS,
} from 'react-native-reanimated';
import Logo from '../../assets/logo_background_gray.svg';
import Brand from '../../assets/logo.svg';
import { Container } from './styles';
import { useGlobalContext } from '../../hooks/useGlobalVariables';

export const Splash = () => {
	const { setSplashLoaded } = useGlobalContext();
	const splashAnimation = useSharedValue(0); // A animação da minha tela inteira
	function startApp() {
		setSplashLoaded(true);
	}

	const brandAnimation = useAnimatedStyle(() => {
		return {
			// opacity: interpolate(splashAnimation.value, [0, 50], [1, 0], Extrapolate.CLAMP),
			translateY: interpolate(splashAnimation.value, [0, 50], [25, -25], Extrapolate.CLAMP),
		};
	});
	const logoAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(splashAnimation.value, [0, 25, 35, 50], [150, 120, 80, 40], Extrapolate.CLAMP),
			opacity: interpolate(splashAnimation.value, [0, 25, 35, 50], [1, 0.2, 0.3, 1], Extrapolate.CLAMP),
			translateY: interpolate(splashAnimation.value, [0, 25, 50], [-150, 79, 80], Extrapolate.CLAMP),
			transform: [
				{
					rotateZ: interpolate(splashAnimation.value, [0, 25, 50], [0, -360, -1080], Extrapolate.CLAMP) + 'deg',
				},
			],
		};
	});

	useEffect(() => {
		splashAnimation.value = withTiming(50, { duration: 3000 }, () => {
			'worklet', runOnJS(startApp)();
		});
	}, []);

	return (
		<>
			<Container>
				<Animated.View style={[{ height: 200, width: 200, position: 'absolute' }, logoAnimation]}>
					<Logo width="100%" height="100%" />
				</Animated.View>
				<Animated.View style={[{ height: 200, width: 170, position: 'absolute' }, brandAnimation]}>
					<Brand width="100%" height="100%" />
				</Animated.View>
			</Container>
		</>
	);
};
