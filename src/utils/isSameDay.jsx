import { differenceInCalendarDays } from 'date-fns';

export function isSameDay(a, b) {
	return differenceInCalendarDays(a, b) === 0;
}
