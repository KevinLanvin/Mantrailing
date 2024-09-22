import type { ScoreScale } from '../../domain/entities/ScoreScale'
import type { TrackConfig } from '../../domain/entities/TrackConfig'

export const getWindScore = (scoreScale: ScoreScale, trackConfig: TrackConfig): number => {
	if (!trackConfig.windForce || !trackConfig.windDirection) {
		return 0
	}
	const availableWindForces = getAvailableWindForces(scoreScale.wind[trackConfig.windDirection])
	const windForce = getWindForce(availableWindForces, trackConfig.windForce)
	return scoreScale.wind[trackConfig.windDirection][windForce]
}

const getAvailableWindForces = (windDirectionScale: Record<number, unknown>) => {
	return Object.keys(windDirectionScale).map((windForce) => +windForce)
}

const getWindForce = (availableWindForces: number[], selectedWindForce: number) => {
	return availableWindForces.reduce(
		(minWindForce, currentWindForce) => {
			return selectedWindForce <= currentWindForce && currentWindForce < minWindForce
				? currentWindForce
				: minWindForce
		},
		Math.max(...availableWindForces)
	)
}
