import React from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BorderlessButton } from 'react-native-gesture-handler';
import PeoplePadrao from '../../assets/user-padrao.png';

import { Close, Logout, ProfileImage, ToogleWrapper } from './styles';
import { useAuthContext } from '../../hooks/useAuth';

export const ToogleMenu = () => {
	const { userAuth, LogOut } = useAuthContext();
	const profileOptionsOpenRef = React.useRef(false);
	const profileOptionsWidth = useSharedValue(0);
	const closeOptionOpacity = useSharedValue(0);

	const handleProfileOptions = () => {
		if (!profileOptionsOpenRef.current) {
			profileOptionsOpenRef.current = true;
			closeOptionOpacity.value = withTiming(30, { duration: 500 });
			return (profileOptionsWidth.value = withTiming(30, { duration: 500 }));
		}
		profileOptionsOpenRef.current = false;
		profileOptionsWidth.value = withTiming(0, { duration: 500 });
		closeOptionOpacity.value = withTiming(0, { duration: 250 });
	};

	const closeOptionStyle = useAnimatedStyle(() => ({
		width: profileOptionsWidth.value,
		opacity: interpolate(closeOptionOpacity.value, [0, 20, 30], [0, 0.3, 1]),
		marginRight: profileOptionsWidth.value / 3,
		marginLeft: !!profileOptionsOpenRef.current ? 20 : 0,
	}));

	const handleLogout = () => {
		LogOut();
	};

	return (
		<BorderlessButton onPress={handleProfileOptions}>
			<ToogleWrapper>
				<Animated.View style={[closeOptionStyle]}>
					<BorderlessButton onPress={handleLogout}>
						<Logout />
					</BorderlessButton>
				</Animated.View>
				<BorderlessButton onPress={handleProfileOptions}>
					<ProfileImage source={!!userAuth.photo ? { uri: userAuth.photo } : PeoplePadrao} />
				</BorderlessButton>
				{/* <Animated.View style={closeOptionStyle}>
					<BorderlessButton onPress={handleProfileOptions}>
						<Close />
					</BorderlessButton>
				</Animated.View> */}
			</ToogleWrapper>
		</BorderlessButton>
	);
};
