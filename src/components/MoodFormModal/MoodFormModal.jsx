import React, { useCallback, useState } from 'react';
import cloudIcon from '../../assets/cloud.svg';
import sunIcon from '../../assets/sun.svg';
import cloudSnowIcon from '../../assets/cloud-snow.svg';
import cloudRainIcon from '../../assets/cloud-rain.svg';
import cloudLightningIcon from '../../assets/cloud-lightning.svg';
import cloudDrizzleIcon from '../../assets/cloud-drizzle.svg';
import { useSelectedMoodDateContext } from '../../context/SelectedMoodDateContext';
import { useNewMoodContext } from '../../context/NewMoodContext';
import { useIsEditingContext } from '../../context/IsEditingContext';
import { useMoodsContext } from '../../context/MoodsContext';
import { isSameDay } from '../../utils/isSameDay';

const weatherOptions = [
	{ label: 'Słońce', value: 'sun', icon: sunIcon },
	{ label: 'Chmury', value: 'cloud', icon: cloudIcon },
	{ label: 'Mżawka', value: 'cloud-drizzle', icon: cloudDrizzleIcon },
	{ label: 'Deszcz', value: 'cloud-rain', icon: cloudRainIcon },
	{ label: 'Śnieg', value: 'cloud-snow', icon: cloudSnowIcon },
	{ label: 'Burza', value: 'cloud-lightning', icon: cloudLightningIcon },
];

const moodOptions = [
	{ label: 'Zielony', value: 'green', color: 'bg-green-500' },
	{ label: 'Żółty', value: 'yellow', color: 'bg-yellow-500' },
	{ label: 'Pomarańczowy', value: 'orange', color: 'bg-orange-500' },
	{ label: 'Czerwony', value: 'red', color: 'bg-red-500' },
];

export function MoodFormModal({ setIsFormShown, onClose }) {
	const [errors, setErrors] = useState({});
	const { selectedMoodDate } = useSelectedMoodDateContext();
	const { newMood, setNewMood } = useNewMoodContext();
	const { isEditing, setIsEditing } = useIsEditingContext();
	const { moods, setMoods } = useMoodsContext();

	const handleChange = useCallback(
		(event) => {
			const { name, value } = event.target;
			setNewMood((prev) => ({ ...prev, [name]: value }));
		},
		[setNewMood]
	);

	const handleWeatherChange = useCallback(
		(value) => {
			setNewMood((prev) => ({ ...prev, weather: value }));
		},
		[setNewMood]
	);

	const handleMoodChange = useCallback(
		(value) => {
			setNewMood((prev) => ({ ...prev, moodType: value }));
		},
		[setNewMood]
	);

	const validate = useCallback(() => {
		const newErrors = {};
		if (!newMood.moodType) {
			newErrors.moodType = 'Wybór nastroju jest wymagany.';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [newMood]);

	const handleDelete = useCallback(() => {
		console.log('sdsa');
		setMoods((prevMoods) =>
			prevMoods.filter((mood) => !isSameDay(mood.date, selectedMoodDate))
		);
		setIsFormShown(false);
		setIsEditing(false);
	}, [selectedMoodDate, setMoods, setIsFormShown, setIsEditing]);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			if (validate()) {
				if (isEditing) {
					setMoods(
						moods.map((mood) =>
							isSameDay(mood.date, selectedMoodDate)
								? { ...mood, ...newMood }
								: mood
						)
					);
				} else {
					setMoods([...moods, { ...newMood, date: selectedMoodDate }]);
				}
				setIsFormShown(false);
				setIsEditing(false);
			}
		},
		[
			isEditing,
			moods,
			newMood,
			selectedMoodDate,
			setIsFormShown,
			setIsEditing,
			setMoods,
			validate,
		]
	);

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
				<h3 className='text-lg font-semibold mb-4'>
					{isEditing ? 'Edytuj nastrój' : 'Dodaj nowy nastrój'}
				</h3>
				<form onSubmit={handleSubmit}>
					<div className='mb-2'>
						<p className='mb-1 font-semibold'>Miejsce dodania:</p>
						<input
							type='text'
							name='location'
							value={newMood.location}
							onChange={handleChange}
							placeholder='np. Kawiarnia'
							className='w-full mb-2 p-2 border border-gray-300 rounded'
						/>
						{errors.location && (
							<p className='text-red-500 text-sm'>{errors.location}</p>
						)}
					</div>

					<div className='mb-2'>
						<p className='mb-1 font-semibold'>Wybierz nastrój:</p>
						<div className='flex gap-2'>
							{moodOptions.map((option) => (
								<button
									type='button'
									key={option.value}
									onClick={() => handleMoodChange(option.value)}
									className={`w-10 h-10 rounded-full ${option.color} ${
										newMood.moodType === option.value
											? 'ring-2 ring-offset-2 ring-blue-500'
											: ''
									}`}
								>
									<span className='sr-only'>{option.label}</span>
								</button>
							))}
						</div>
						{errors.moodType && (
							<p className='text-red-500 text-sm'>{errors.moodType}</p>
						)}
					</div>

					<div className='mb-2'>
						<p className='mb-1 font-semibold'>Wybierz pogodę:</p>
						<div className='flex gap-2'>
							{weatherOptions.map((option) => (
								<button
									type='button'
									key={option.value}
									onClick={() => handleWeatherChange(option.value)}
									className={`p-2 border rounded-lg ${
										newMood.weather === option.value
											? 'bg-blue-200 border-blue-500'
											: 'border-gray-300'
									}`}
								>
									<img
										src={option.icon}
										alt={option.label}
										className='w-6 h-6'
									/>
								</button>
							))}
						</div>
						{errors.weather && (
							<p className='text-red-500 text-sm'>{errors.weather}</p>
						)}
					</div>

					<p className='mb-1 font-semibold'>Opisz swój humor:</p>
					<textarea
						name='description'
						value={newMood.description}
						onChange={handleChange}
						placeholder='np. Słońce w kawiarni dodało mi otuchy i relaksu.'
						className='w-full mb-2 p-2 border border-gray-300 rounded'
					></textarea>
					{errors.description && (
						<p className='text-red-500 text-sm'>{errors.description}</p>
					)}

					<div className='flex justify-end space-x-2'>
						{isEditing && (
							<button
								type='button'
								className='bg-red-500 text-white p-2 rounded'
								onClick={handleDelete}
							>
								Usuń wpis
							</button>
						)}
						<button
							type='button'
							onClick={onClose}
							className='bg-gray-400 text-white p-2 rounded'
						>
							Anuluj
						</button>
						<button
							type='submit'
							className='bg-blue-500 text-white p-2 rounded'
						>
							{isEditing ? 'Zapisz zmiany' : 'Dodaj nastrój'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
