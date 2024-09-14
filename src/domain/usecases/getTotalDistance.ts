import type { Path } from '../entities/Path'

export const getTotalDistance = (path: Path, totalDistance = 0): number => {
	const lastPoint = path.pop()
	if (!lastPoint || !path.length) {
		return totalDistance
	}
	return getTotalDistance(
		path,
		totalDistance +
			Math.floor(
				getDistanceFromLatLon(
					lastPoint.latitude,
					lastPoint.longitude,
					path[path.length - 1].latitude,
					path[path.length - 1].longitude
				)
			)
	)
}

function getDistanceFromLatLon(lat1: number, lon1: number, lat2: number, lon2: number) {
	const R = 6371 // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1) // deg2rad below
	const dLon = deg2rad(lon2 - lon1)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const d = R * c // Distance in km
	return d * 1000
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180)
}
