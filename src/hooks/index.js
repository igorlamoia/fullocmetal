import React, { createContext } from 'react';

const AppContext = createContext({});
import { GlobalContextProvider } from './useGlobalVariables';
import { AuthProvider } from './useAuth';

export const ContextProviderWrapper = ({ children }) => {
	return (
		<AppContext.Provider value={{}}>
			<GlobalContextProvider>
				<AuthProvider>{children}</AuthProvider>
			</GlobalContextProvider>
		</AppContext.Provider>
	);
};
