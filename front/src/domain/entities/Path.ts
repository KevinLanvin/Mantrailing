export type Path = AccurateCoordinate[]
export type AccurateCoordinate = Coordinate & {
	accuracy: number
}

export type Coordinate = {
	latitude: number
	longitude: number
}

export type Turn = Coordinate & {
	angle: number
}
