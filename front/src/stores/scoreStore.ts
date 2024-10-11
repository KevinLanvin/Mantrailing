import { derived, writable } from 'svelte/store'

import type { ScoreScale } from '../domain/entities/ScoreScale'
import type { TrackConfig } from '../domain/entities/TrackConfig'
import dataJSON from '../data.json'
import { getDistanceScore } from '../domain/usecases/getDistanceScore'
import { getMoistureScore } from '../domain/usecases/getMoistureCode'
import { getTemperatureScore } from '../domain/usecases/getTemperatureScore'
import { getWindScore } from '../domain/usecases/getWindScore'

export const scoreScale = writable<ScoreScale>(dataJSON as ScoreScale)
export const trackConfig = writable<TrackConfig>({})

export const score = derived([scoreScale, trackConfig], ([scoreScale, trackConfig]) => {
	const scoreCalculators = [getWindScore, getTemperatureScore, getMoistureScore, getDistanceScore]
	return scoreCalculators.reduce((totalScore, calculator) => {
		const currentScore = calculator(scoreScale, trackConfig)
		return totalScore + currentScore
	}, 0)
})
