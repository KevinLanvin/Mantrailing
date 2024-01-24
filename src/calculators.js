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
