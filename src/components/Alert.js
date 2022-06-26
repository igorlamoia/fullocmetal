import React, { useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { useTheme } from 'styled-components';
import { useGlobalContext } from '../hooks/useGlobalVariables';
import sadBad from '../assets/marquinhos-sad.png';

export const Alert = () => {
	const theme = useTheme();
	const {
		clearShowMessage,
		globalMessage: { visible, type, title, message },
	} = useGlobalContext();
	const dropdownRef = useRef();

	const showMessage = () => {
		if (dropdownRef.current) {
			dropdownRef.current.alertWithType(type, title, message);
		}
		clearShowMessage();
	};

	useEffect(() => {
		if (visible) {
			showMessage();
		}
	}, [visible]);

	return (
		<DropdownAlert
			ref={dropdownRef}
			zIndex={9999}
			closeInterval={10000}
			updateStatusBar={false}
			defaultContainer={{
				padding: 8,
				paddingTop: Platform.OS === 'android' ? 30 : 25,
				flexDirection: 'row',
			}}
			errorImageSrc={sadBad}
			successColor={theme.colors.success}
			infoColor={theme.colors.info}
			warnColor={theme.colors.warning}
			errorColor={theme.colors.error}
			imageStyle={{ width: 100, height: 100, alignSelf: 'center', resizeMode: 'contain' }}
		/>
	);
};
