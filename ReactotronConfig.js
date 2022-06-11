import Reactotron from 'reactotron-react-native';

console.tron = Reactotron.configure({
	name: 'Reactotron In Expo demo',
})
	.useReactNative({
		asyncStorage: false,
		networking: {
			ignoreUrls: /symbolicate|127.0.0.1/,
		},
		editor: false,
		errors: { veto: (stackFrame) => false },
		overlay: false,
	})
	.connect();
