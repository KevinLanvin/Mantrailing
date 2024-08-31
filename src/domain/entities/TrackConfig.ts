import type { DogLevel, MoistureLevel, WindDirection } from './ScoreScale'

export type TrackConfig = WindConfig &
	TemperatureConfig &
	MoistureConfig &
	DistanceConfig &
	DogLevelConfig

export type WindConfig = {
	windForce?: number
	windDirection?: WindDirection
}

export type TemperatureConfig = {
	temperature?: number
}

export type MoistureConfig = {
	moisture?: MoistureLevel
}

export type DistanceConfig = {
	distance?: number
}

export type DogLevelConfig = {
	dogLevel?: DogLevel
}
