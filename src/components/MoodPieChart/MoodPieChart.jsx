import React, { useCallback, useEffect, useMemo } from 'react';
import { PieChart } from '@mui/x-charts';
import { startOfMonth, endOfMonth } from 'date-fns';
import { useMoodsContext } from '../../context/MoodsContext';
import { startOfDay, endOfDay } from 'date-fns';

export function MoodPieChart({ minDate, maxDate, annualView }) {
	const { moods } = useMoodsContext();

	const start = startOfMonth(minDate);
	const end = endOfMonth(maxDate);

	useEffect(() => {}, [moods]);

	const moodCounts = useMemo(() => {
		const localStart = startOfDay(start);
		const localEnd = endOfDay(end);

		const counts = moods.reduce((acc, mood) => {
			const moodDate = new Date(mood.date);
			// Porownanie z datami w tej samej strefie czasowej
			if (moodDate >= localStart && moodDate <= localEnd) {
				acc[mood.moodType] = (acc[mood.moodType] || 0) + 1;
			}
			return acc;
		}, {});

		return counts;
	}, [moods, start, end]);

	const moodTypes = ['green', 'yellow', 'orange', 'red'];

	const getMoodColor = useCallback((moodType) => {
		const moodColors = {
			green: '#22c55e',
			yellow: '#F59E0B',
			orange: '#F97316',
			red: '#EF4444',
		};
		return moodColors[moodType];
	}, []);

	const getMoodLabel = useCallback((moodType) => {
		const moodLabels = {
			green: 'Zielony',
			yellow: 'Żółty',
			orange: 'Pomarańczowy',
			red: 'Czerwony',
		};
		return moodLabels[moodType] || 'Nieznany';
	}, []);

	const totalMoodsCount = Object.values(moodCounts).reduce(
		(sum, count) => sum + count,
		0
	);

	const data = useMemo(() => {
		return moodTypes.map((moodType) => {
			const count = moodCounts[moodType] || 0;
			const percentage =
				totalMoodsCount > 0 ? ((count / totalMoodsCount) * 100).toFixed(2) : 0;

			return {
				id: moodType,
				value: count,
				label: `${getMoodLabel(moodType)}`,
				color: getMoodColor(moodType),
				percentage: percentage,
			};
		});
	}, [moodCounts, moodTypes, getMoodColor, getMoodLabel, totalMoodsCount]);

	const hasData = useMemo(() => data.some((item) => item.value > 0), [data]);

	const mostFrequentMood = useMemo(() => {
		return Object.keys(moodCounts).reduce(
			(a, b) => (moodCounts[a] > moodCounts[b] ? a : b),
			null
		);
	}, [moodCounts]);

	const mostFrequentMoodCount = mostFrequentMood
		? moodCounts[mostFrequentMood]
		: 0;

	const innerData = useMemo(
		() =>
			mostFrequentMood
				? [
						{
							id: 0,
							value: mostFrequentMoodCount,
							label: getMoodLabel(mostFrequentMood),
							color: getMoodColor(mostFrequentMood),
						},
				  ]
				: [],
		[mostFrequentMood, mostFrequentMoodCount, getMoodColor, getMoodLabel]
	);

	return (
		<div className='z-10 max-w-150 scale-custom'>
			<h2 className='text-sm font-semibold text-center'>
				Statystyki nastrojów {annualView ? <>(ogólne)</> : <>w tym miesiącu</>}
			</h2>
			<div className='relative scale-75'>
				{hasData ? (
					<>
						<PieChart
							series={[
								{
									data: innerData,
									backgroundColor: innerData.map((item) => item.color),
									cx: 70,
									innerRadius: 0,
									outerRadius: 30,
									paddingAngle: 2,
									cornerRadius: 5,
								},
							]}
							width={150}
							height={150}
							style={{ position: 'absolute', top: 0, left: 0 }}
							slotProps={{
								legend: {
									hidden: true,
								},
							}}
						/>
						<PieChart
							series={[
								{
									data: data,
									backgroundColor: data.map((item) => item.color),
									cx: 70,
									innerRadius: 32,
									startAngle: -90,
									endAngle: 270,
									outerRadius: 75,
									paddingAngle: 2,
									cornerRadius: 5,
									arcLabel: (item) => `${item.percentage}%`,
								},
							]}
							width={150}
							height={150}
							slotProps={{
								legend: {
									hidden: true,
								},
							}}
						/>
					</>
				) : (
					<p className='text-center text-gray-500'>Brak danych</p>
				)}
			</div>
		</div>
	);
}