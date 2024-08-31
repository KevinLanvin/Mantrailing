import type { Coordinate, Path } from '../domain/entities/Path'

import { writable } from 'svelte/store'

export const path = writable<Path>([])

export const currentCoordinates = writable<Coordinate>({
	latitude: 43.89408485925609,
	longitude: 7.258264456666688,
	accuracy: 0
})
