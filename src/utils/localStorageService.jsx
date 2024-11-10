export const loadFromLocalStorage = (key) => {
	const storedData = localStorage.getItem(key);
	return storedData ? JSON.parse(storedData) : [];
};

export const saveToLocalStorage = (data, key) => {
	localStorage.setItem(key, JSON.stringify(data));
};
