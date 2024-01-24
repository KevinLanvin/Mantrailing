import { derived, writable } from 'svelte/store';

import dataJSON from './data.json';

export const data = writable(dataJSON);
export const options = writable({});

export const score = derived([data, options], ([$data, $options]) => {
	const windForce = [0, 50, 70, 100].find((force) => $options.windForce <= force);
	const windScore = $data?.wind?.[$options.wind]?.[windForce] ?? 0;
	const temperature = [0, 10, 15, 20, 30].find(
		(temperature) => $options.temperature <= temperature
	);
	const temperatureScore = $data?.temperature?.[temperature] ?? 0;
	return windScore + temperatureScore;
});
