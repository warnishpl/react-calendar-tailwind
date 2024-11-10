import React, { useCallback } from 'react';
import Calendar from 'react-calendar';
import { SetMoodColorTile } from '../../utils/SetMoodColorTile';
import './MoodCalendar.css';
import { useMoodsContext } from '../../context/MoodsContext';
import { useSelectedMoodDateContext } from '../../context/SelectedMoodDateContext';
import { useNewMoodContext } from '../../context/NewMoodContext';
import { useIsEditingContext } from '../../context/IsEditingContext';
import { isSameDay } from '../../utils/isSameDay';

export function MoodCalendar({
	setIsFormShown,
	today,
	getDisplayedMonthDate,
	minDate,
}) {
	const { moods } = useMoodsContext();
	const { setSelectedMoodDate } = useSelectedMoodDateContext();
	const { setNewMood } = useNewMoodContext();
	const { setIsEditing } = useIsEditingContext();
	const onClickDay = useCallback(
		(date) => {
			const mood = moods.find((mood) => isSameDay(mood.date, date));
			if (mood) {
				setNewMood({
					location: mood.location,
					moodType: mood.moodType,
					weather: mood.weather,
					description: mood.description || '',
				});
				setSelectedMoodDate(date);
				setIsEditing(true);
				setIsFormShown(true);
			} else {
				setSelectedMoodDate(date);
				setNewMood({
					location: '',
					moodType: '',
					weather: '',
					description: '',
				});
				setIsEditing(false);
				setIsFormShown(true);
			}
		},
		[[moods, setNewMood, setSelectedMoodDate, setIsEditing, setIsFormShown]]
	);

	return (
		<div>
			<Calendar
				minDate={minDate}
				maxDate={today}
				onChange={() => {}}
				value={today}
				onClickDay={onClickDay}
				onActiveStartDateChange={getDisplayedMonthDate}
				tileClassName={({ date, view }) =>
					view === 'month' ? SetMoodColorTile({ date, moods }) : ''
				}
			/>
		</div>
	);
}
