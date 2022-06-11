import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const GlobalContext = createContext({});

export const GlobalContextProvidader = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);

	return <GlobalContext.Provider value={{ isLoading, setIsLoading }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
