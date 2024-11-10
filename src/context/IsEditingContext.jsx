import React, { createContext, useContext, useState } from 'react';

const IsEditingContext = createContext();

export function IsEditingProvider({ children }) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<IsEditingContext.Provider value={{ isEditing, setIsEditing }}>
			{children}
		</IsEditingContext.Provider>
	);
}

export const useIsEditingContext = () => useContext(IsEditingContext);
