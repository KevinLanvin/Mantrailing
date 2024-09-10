import type { AccurateCoordinate, Path } from '../domain/entities/Path'
import { derived, writable } from 'svelte/store'

import { getTurns } from '../domain/usecases/getTurns'

export const path = writable<Path>([])

export const currentCoordinates = writable<AccurateCoordinate>({
	latitude: 43.89408485925609,
	longitude: 7.258264456666688,
	accuracy: 0
})

export const turns = derived(path, ($path) => {
	return getTurns($path)
})
