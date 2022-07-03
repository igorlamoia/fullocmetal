import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [splashLoaded, setSplashLoaded] = useState(false);
	const [globalMessage, setGlobalMessage] = useState({ visible: false });
	const [fullocModal, setFullocModal] = useState({});

	const showError = (message) => {
		setGlobalMessage({ visible: true, type: 'error', title: 'Ops... Algo de errado aconteceu', message });
	};
	const showWarning = (message) => {
		setGlobalMessage({ visible: true, type: 'warning', title: 'Alerta!', message });
	};
	const showSuccess = (message) => {
		setGlobalMessage({ visible: true, type: 'success', title: 'Sucesso!', message });
	};

	const clearShowMessage = () => {
		setGlobalMessage({ visible: false });
	};

	return (
		<GlobalContext.Provider
			value={{
				isLoading,
				setIsLoading,
				setSplashLoaded,
				splashLoaded,
				setFullocModal,
				globalMessage,
				setGlobalMessage,
				showError,
				showWarning,
				showSuccess,
				clearShowMessage,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
