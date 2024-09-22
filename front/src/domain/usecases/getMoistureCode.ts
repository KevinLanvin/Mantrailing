import type { ScoreScale } from '../../domain/entities/ScoreScale'
import type { TrackConfig } from '../../domain/entities/TrackConfig'

export const getMoistureScore = (scoreScale: ScoreScale, trackConfig: TrackConfig): number => {
	if (!trackConfig.moisture) {
		return 0
	}
	return scoreScale.moisture[trackConfig.moisture] || 0
}
