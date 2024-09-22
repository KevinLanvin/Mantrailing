import type { ScoreScale, TemperatureScale } from '../../domain/entities/ScoreScale'

import type { TrackConfig } from '../../domain/entities/TrackConfig'

export const getTemperatureScore = (scoreScale: ScoreScale, trackConfig: TrackConfig): number => {
	if (!trackConfig.temperature) {
		return 0
	}
	const availableTemperatures = getAvailableTemperatures(scoreScale.temperature)
	const temperature = getTemperature(availableTemperatures, trackConfig.temperature)
	return scoreScale.temperature[temperature]
}

const getAvailableTemperatures = (temperatureScale: TemperatureScale) => {
	return Object.keys(temperatureScale).map((temperature) => +temperature)
}

const getTemperature = (availableTemperatures: number[], selectedTemperature: number) => {
	return availableTemperatures.reduce(
		(minTemperature, currentTemperature) => {
			return selectedTemperature <= currentTemperature && currentTemperature < minTemperature
				? currentTemperature
				: minTemperature
		},
		Math.max(...availableTemperatures)
	)
}
