import { derived, writable } from 'svelte/store';
import {
	getDistanceScore,
	getMoistureScore,
	getTemperatureScore,
	getWindScore
} from './calculators';

import dataJSON from './data.json';

export const data = writable(dataJSON);
export const options = writable({});

export const score = derived([data, options], ([$data, $options]) => {
	const scoreCalculators = [getWindScore, getTemperatureScore, getMoistureScore, getDistanceScore];
	return scoreCalculators.reduce(
		(totalScore, calculator) => totalScore + calculator($data, $options),
		0
	);
});
