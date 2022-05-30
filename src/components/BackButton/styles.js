import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Button = styled(BorderlessButton)`
	position: absolute;
	margin-top: ${getStatusBarHeight() + 24}px;
	margin-left: 32px;
`;
