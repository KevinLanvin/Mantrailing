import type { Coordinate, Path, Turn } from '../entities/Path'

export const getTurns = (path: Path): Turn[] => {
	const turns = []
	for (let index = 0; index < path.length - 2; ++index) {
		const bearingA = getBearing(path[+index], path[+index + 1])
		const bearingB = getBearing(path[+index + 1], path[+index + 2])
		const angle = getAngle(bearingB - bearingA)
		const absoluteAngle = Math.abs(angle)
		if (absoluteAngle >= 30) {
			turns.push({
				latitude: path[+index + 1].latitude,
				longitude: path[+index + 1].longitude,
				angle
			})
		}
	}
	return turns
}

const getBearing = (pointA: Coordinate, pointB: Coordinate) => {
	const y = Math.sin(pointB.longitude - pointA.longitude) * Math.cos(pointB.latitude)
	const x =
		Math.cos(pointA.latitude) * Math.sin(pointB.latitude) -
		Math.sin(pointA.latitude) *
			Math.cos(pointB.latitude) *
			Math.cos(pointB.longitude - pointA.longitude)
	const radBearing = Math.atan2(y, x)
	return ((radBearing * 180) / Math.PI + 360) % 360 // in degrees
}

// Get an angle between -180 and 180 deg
const getAngle = (a: number) => {
	return ((((a + 180) % 360) + 360) % 360) - 180
}
