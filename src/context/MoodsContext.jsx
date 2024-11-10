import React, { createContext, useContext, useEffect, useState } from 'react';

const MoodsContext = createContext();

export function MoodsProvider({ children }) {
	const [moods, setMoods] = useState(() => {
		const savedMoods = localStorage.getItem('moods');
		return savedMoods ? JSON.parse(savedMoods) : [];
	});

	useEffect(() => {
		localStorage.setItem('moods', JSON.stringify(moods));
	}, [moods]);

	return (
		<MoodsContext.Provider value={{ moods, setMoods }}>
			{children}
		</MoodsContext.Provider>
	);
}

export const useMoodsContext = () => useContext(MoodsContext);
