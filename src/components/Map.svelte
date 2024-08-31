<script lang="ts">
	import L, { type LatLngTuple } from 'leaflet'
	import { currentCoordinates, path } from '../stores/pathStore'
	import type { Coordinate, Path } from '../domain/entities/Path'
	import { watch } from '../stores/watch'
	import 'leaflet/dist/leaflet.css'

	let map: L.Map
	let circle: L.Circle
	let lineLayers: L.Polyline

	const initialView: LatLngTuple = [$currentCoordinates.latitude, $currentCoordinates.longitude]

	const createMap = (container: string | HTMLElement) => {
		let m = L.map(container, { preferCanvas: true }).setView(initialView, 16)
		L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution:
				'&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(m)
		circle = L.circle(initialView, { radius: $currentCoordinates.accuracy })
		circle.addTo(m)
		return m
	}
	const getLineFromPath = ($path: Path): LatLngTuple[] => {
		return $path.map(({ latitude, longitude }) => [latitude, longitude])
	}

	const createLines = () => {
		return L.polyline(getLineFromPath($path), { color: '#E4E', opacity: 0.5 })
	}

	const mapAction = (container: string | HTMLElement) => {
		map = createMap(container)
		lineLayers = createLines()
		lineLayers.addTo(map)

		return {
			destroy: () => {
				map.remove()
			}
		}
	}

	const resizeMap = () => {
		if (map) {
			map.invalidateSize()
		}
	}

	watch(currentCoordinates, ($currentCoordinates: Coordinate) => {
		if (map) {
			const latlng: L.LatLngTuple = [$currentCoordinates.latitude, $currentCoordinates.longitude]
			circle.setLatLng(latlng)
			circle.setRadius($currentCoordinates.accuracy)
			map.panTo(latlng)
		}
	})

	watch(path, ($path: Path) => {
		if (map) {
			lineLayers.setLatLngs(getLineFromPath($path))
		}
	})
</script>

<svelte:window on:resize={resizeMap} />

<div class="map" use:mapAction />

<style lang="scss">
	.map {
		width: 300px;
		height: 300px;
		:global(.leaflet-map-pane) {
			overflow: visible;
		}
		:global(.leaflet-map-pane *) {
			overflow: visible;
		}
		:global(.leaflet-control-attribution) {
			display: none;
		}
	}
</style>
