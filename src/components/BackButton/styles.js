import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(BorderlessButton)`
	position: absolute;
	margin-top: ${getStatusBarHeight() + RFValue(20)}px;
	margin-left: 32px;
	z-index: 1;
`;
