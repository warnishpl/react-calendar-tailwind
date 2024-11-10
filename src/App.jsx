import React, { useState } from 'react';
import { MoodCalendar } from './components/MoodCalendar/MoodCalendar';
import { MoodFormModal } from './components/MoodFormModal/MoodFormModal';
import { MoodPieChart } from './components/MoodPieChart/MoodPieChart';
import { MoodsProvider } from './context/MoodsContext';
import { SelectedMoodDateProvider } from './context/SelectedMoodDateContext';
import { NewMoodProvider } from './context/NewMoodContext';
import { IsEditingProvider } from './context/IsEditingContext';

const today = new Date(); // Od tej daty blokuje dni w MoodCalendar
const minDate = new Date(2023, 0, 1); // Można dodawać wpisy dopiero od tej daty

export function App() {
	const [isFormShown, setIsFormShown] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(today); // Aktualnie wyswietlany miesiac w chartsach

	// Obsluga zmiany aktualnie wyswietlanego miesiaca w MoodCalendar potrzebna do wyswietlania chartsow
	const getDisplayedMonthDate = (e) => {
		setCurrentMonth(e.activeStartDate);
	};

	return (
		<IsEditingProvider>
			<SelectedMoodDateProvider>
				<MoodsProvider>
					<NewMoodProvider>
						<div className='body'>
							<div className='CalendarWrapper'>
								<MoodCalendar
									setIsFormShown={setIsFormShown}
									minDate={minDate}
									today={today}
									getDisplayedMonthDate={getDisplayedMonthDate}
									currentMonth={currentMonth}
								/>
							</div>

							<div className='ChartsWrapper'>
								<MoodPieChart
									annualView={true}
									minDate={minDate}
									maxDate={today}
								></MoodPieChart>
								<MoodPieChart
									minDate={currentMonth}
									maxDate={currentMonth}
								></MoodPieChart>
							</div>
							{isFormShown && (
								<MoodFormModal
									setIsFormShown={setIsFormShown}
									onClose={() => setIsFormShown(false)}
								/>
							)}
						</div>
					</NewMoodProvider>
				</MoodsProvider>
			</SelectedMoodDateProvider>
		</IsEditingProvider>
	);
}
