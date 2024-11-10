import React, { createContext, useContext, useState } from 'react';

const NewMoodContext = createContext();

export function NewMoodProvider({ children }) {
	const [newMood, setNewMood] = useState({
		location: '',
		moodType: '',
		weather: '',
		description: '',
	});

	return (
		<NewMoodContext.Provider value={{ newMood, setNewMood }}>
			{children}
		</NewMoodContext.Provider>
	);
}

export const useNewMoodContext = () => useContext(NewMoodContext);
