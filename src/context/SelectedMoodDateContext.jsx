import React, { createContext, useContext, useState } from 'react';

const SelectedMoodDateContext = createContext();

export function SelectedMoodDateProvider({ children }) {
	const [selectedMoodDate, setSelectedMoodDate] = useState(new Date());

	return (
		<SelectedMoodDateContext.Provider
			value={{ selectedMoodDate, setSelectedMoodDate }}
		>
			{children}
		</SelectedMoodDateContext.Provider>
	);
}

export const useSelectedMoodDateContext = () =>
	useContext(SelectedMoodDateContext);
