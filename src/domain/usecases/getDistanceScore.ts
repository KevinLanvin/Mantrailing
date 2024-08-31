import { DogLevel, type ScoreScale } from '../../domain/entities/ScoreScale'
import type { TrackConfig } from '../../domain/entities/TrackConfig'

export const getDistanceScore = (scoreScale: ScoreScale, trackConfig: TrackConfig): number => {
	if (!trackConfig.distance) {
		return 0
	}
	return Math.floor(
		Math.max(
			trackConfig.distance -
				scoreScale.distance.threshold[trackConfig.dogLevel || DogLevel.BEGINNER],
			0
		) * scoreScale.distance.multiplier
	)
}
