import type { AccurateCoordinate, Path, Turn } from '../domain/entities/Path'
import { derived, writable } from 'svelte/store'

import { getTotalDistance } from '../domain/usecases/getTotalDistance'
import { getTurns } from '../domain/usecases/getTurns'

export const path = writable<Path>([])

export const currentCoordinates = writable<AccurateCoordinate>({
	latitude: 43.89408485925609,
	longitude: 7.258264456666688,
	accuracy: 0
})

export const allTurns = derived(path, ($path) => {
	return getTurns($path)
})

export const deletedTurns = writable<Turn[]>([])

export const validTurns = derived([allTurns, deletedTurns], ([$allTurns, $deletedTurns]) => {
	return $allTurns.filter(
		(turn) =>
			!$deletedTurns.some(
				(deletedTurn) =>
					deletedTurn.latitude === turn.latitude && deletedTurn.longitude === turn.longitude
			)
	)
})

export const distance = derived(path, ($path) => {
	return getTotalDistance([...$path])
})
