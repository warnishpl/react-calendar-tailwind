import { isSameDay } from './isSameDay';

export function SetMoodColorTile({ date, moods }) {
	const mood = moods.find((mood) => isSameDay(mood.date, date));
	return mood ? `${mood.moodType}` : '';
}
