<script lang="ts">
	import L, { type LatLngTuple } from 'leaflet'
	import { currentCoordinates, path, turns } from '../stores/pathStore'
	import type { AccurateCoordinate, Path, Turn } from '../domain/entities/Path'
	import { watch } from '../stores/watch'
	import 'leaflet/dist/leaflet.css'

	let map: L.Map
	let circle: L.Circle
	let lineLayers: L.Polyline
	let markerLayer: L.LayerGroup

	const initialView: LatLngTuple = [$currentCoordinates.latitude, $currentCoordinates.longitude]

	const createMap = (container: string | HTMLElement) => {
		let m = L.map(container, { preferCanvas: true }).setView(initialView, 16)
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(m)
		circle = L.circle(initialView, { radius: $currentCoordinates.accuracy })
		circle.addTo(m)
		markerLayer = L.layerGroup([])
		markerLayer.addTo(m)
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

	watch(currentCoordinates, ($currentCoordinates: AccurateCoordinate) => {
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

	watch(turns, ($turns: Turn[]) => {
		if (map) {
			markerLayer.clearLayers()
			for (const turn of $turns) {
				markerLayer.addLayer(
					new L.Marker([turn.latitude, turn.longitude]).bindPopup(`${Math.round(turn.angle)}°`)
				)
			}
		}
	})
</script>

<svelte:window on:resize={resizeMap} />

<div class="map" use:mapAction />

<style lang="scss">
	.map {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
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
