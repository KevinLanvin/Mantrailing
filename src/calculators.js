export const getWindScore = ($data, $options) => {
	const windForce = [0, 50, 70, 100].find((force) => $options.windForce <= force);
	return $data?.wind?.[$options.wind]?.[windForce] ?? 0;
};

export const getTemperatureScore = ($data, $options) => {
	const temperature = [0, 10, 15, 20, 30].find(
		(temperature) => $options.temperature <= temperature
	);
	return $data?.temperature?.[temperature] ?? 0;
};

export const getMoistureScore = ($data, $options) => {
	return $data?.moisture?.[$options.moisture] ?? 0;
};

export const getDistanceScore = ($data, $options) => {
	const distance =
		[20, 100, 200, 500, 1000, 1500].find((distance) => $options.distance <= distance) || 1500;
	console.log($options.distance, distance);
	return $data?.distance?.[distance]?.value ?? 0;
};
