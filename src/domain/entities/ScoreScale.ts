export type ScorePoint = number

export type ScoreScale = {
	wind: WindScale
	temperature: TemperatureScale
	moisture: MoistureScale
	distance: DistanceScale
	terrain: TerrainScale
	turns: TurnScale
	wrongTracks: WrongTrackScale
}

export type WindScale = Record<WindDirection, Record<number, ScorePoint>>
export type TemperatureScale = Record<number, ScorePoint>
export type MoistureScale = { [K in MoistureLevel]?: ScorePoint }
export type DistanceScale = { threshold: Record<DogLevel, number>; multiplier: number }
export type SpecificDistanceScale = {
	value: ScorePoint
	malus: { [K in DogLevel]?: ScorePoint }
}
export type TerrainScale = { [K in TerrainType]?: ScorePoint }
export type TurnScale = ScorePoint
export type WrongTrackScale = ScorePoint[]

export enum WindDirection {
	FRONT = 'front',
	SIDE = 'side',
	BACK = 'back'
}

export enum MoistureLevel {
	MOIST = 'moist',
	DRY = 'dry',
	WARM = 'warm'
}

export enum DogLevel {
	BEGINNER = 'beginner',
	INTERMEDIATE = 'intermediate',
	PRO = 'pro'
}

export enum TerrainType {
	GRASS = 'grass',
	BITUMEN = 'bitumen',
	PATH = 'path',
	PARKING = 'parking',
	CITY_CENTER = 'center',
	INDUSTRIAL_ZONE = 'industrialZone',
	BRIDGE = 'bridge',
	SAND = 'sand'
}
