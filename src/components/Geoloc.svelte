<script lang="ts">
	import { onDestroy } from 'svelte'
	import { currentCoordinates, deletedTurns, path } from '../stores/pathStore'

	let watcher: number
	let tracking = false

	const handleTrackingEvent = () => {
		tracking = !tracking
		if (tracking) {
			deletedTurns.set([])
			path.set([$currentCoordinates])
		}
	}

	onDestroy(() => {
		if (watcher) {
			navigator.geolocation.clearWatch(watcher)
		}
	})

	watcher = navigator.geolocation.watchPosition(
		({ coords: { latitude, longitude, accuracy } }) => {
			currentCoordinates.set({ latitude, longitude, accuracy })
			if (tracking) {
				if (accuracy > 2) {
					// TODO error
					console.log('Accuracy is shitty : ', latitude, longitude, accuracy)
				}
				const lastCoordinate = $path[$path.length - 1]
				if (
					lastCoordinate &&
					(latitude === lastCoordinate.latitude || longitude === lastCoordinate.longitude)
				) {
					if (accuracy < lastCoordinate.accuracy) {
						path.update((state) => {
							return [...state.splice(-1), { latitude, longitude, accuracy }]
						})
					}
				} else {
					path.update((state) => {
						return [
							...state,
							{
								latitude,
								longitude,
								accuracy
							}
						]
					})
				}
			}
		},
		(positionError) => {
			console.log(positionError.code, positionError.message)
		},
		{ enableHighAccuracy: true }
	)
</script>

<h2>Coordonnées {$currentCoordinates.latitude}, {$currentCoordinates.longitude}</h2>
<button on:click={handleTrackingEvent}
	>{#if !tracking}Démarrer la trace{:else}Arrêter la trace{/if}</button
>
