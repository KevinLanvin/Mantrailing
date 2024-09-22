<script lang="ts">
	import L, { type LatLngTuple } from 'leaflet'
	import { currentCoordinates, path, allTurns, deletedTurns } from '../stores/pathStore'
	import type { AccurateCoordinate, Path, Turn } from '../domain/entities/Path'
	import { watch } from '../stores/watch'
	import 'leaflet/dist/leaflet.css'

	let map: L.Map
	let circle: L.Circle
	let lineLayers: L.Polyline
	let markerLayer: L.LayerGroup

	const initialView: LatLngTuple = [$currentCoordinates.latitude, $currentCoordinates.longitude]

	const createMap = (container: string | HTMLElement) => {
		let m = L.map(container, { preferCanvas: true }).setView(initialView, 17)
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
		if (map && $currentCoordinates) {
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

	enum iconUrlMap {
		slightLeft = '/material-symbols--turn-slight-left-rounded.svg',
		slightRight = '/material-symbols--turn-slight-right-rounded.svg',
		left = '/material-symbols--turn-left-rounded.svg',
		right = '/material-symbols--turn-right-rounded.svg',
		uLeft = '/material-symbols--u-turn-left-rounded.svg',
		uRight = '/material-symbols--u-turn-right-rounded.svg'
	}

	const getAngleUrl = (angle: number): iconUrlMap => {
		const absoluteAngle = Math.abs(angle)
		if (absoluteAngle < 60) {
			return angle > 0 ? iconUrlMap.slightRight : iconUrlMap.slightLeft
		} else if (absoluteAngle < 120) {
			return angle > 0 ? iconUrlMap.right : iconUrlMap.left
		} else {
			return angle > 0 ? iconUrlMap.uRight : iconUrlMap.uLeft
		}
	}

	const myCustomColour = '#583470'

	const markerHtmlStyles = `
  background-color: ${myCustomColour};
  width: 3rem;
  height: 3rem;
  display: flex;
	justify-content: center;
	align-items: center;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

	const iconStyles = `
		border-radius: 100%;
		width: 2.5rem;
		height: 2.5rem;
		background-color: white;
		transform: rotate(-45deg);
		display: flex;
		align-items: center;
		justify-content: center;
	`

	const imageStyles = `
		width: 2rem;
		height: 2rem;
	`

	const getIcon = (turn: Turn) =>
		L.divIcon({
			className: 'my-custom-pin',
			iconAnchor: [0, 36],
			html: `<div ${isDisabled(turn) ? 'class="marker-disabled"' : ''} style="${markerHtmlStyles}"><div style="${iconStyles}"><img src="${getAngleUrl(turn.angle)}" style="${imageStyles}" /></div></div>`
		})

	const isDisabled = (turn: Turn) => {
		return $deletedTurns.some(
			(comparedTurn) =>
				comparedTurn.latitude === turn.latitude && comparedTurn.longitude === turn.longitude
		)
	}

	const toggleTurn = (event: L.LeafletMouseEvent) => {
		const turn: Turn | undefined = $allTurns.find(
			(t) => t.latitude === event.latlng.lat && t.longitude === event.latlng.lng
		)
		if (!turn) {
			return
		}
		const turnIndex = $deletedTurns.indexOf(turn)
		if (turnIndex === -1) {
			deletedTurns.set([...$deletedTurns, turn])
		} else {
			const newDeletedTurns = [...$deletedTurns]
			newDeletedTurns.splice(turnIndex, 1)
			deletedTurns.set(newDeletedTurns)
		}
	}

	const reloadMarkers = () => {
		if (map) {
			markerLayer.clearLayers()
			for (const turn of $allTurns) {
				markerLayer.addLayer(
					new L.Marker([turn.latitude, turn.longitude], {
						icon: getIcon(turn)
					}).addEventListener('click', toggleTurn)
				)
			}
		}
	}

	watch(allTurns, reloadMarkers)

	watch(deletedTurns, reloadMarkers)
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
		z-index: 1;
	}

	:global(.marker-disabled) {
		background-color: grey !important;
	}
	:global(.marker-disabled > div) {
		background-color: lightgray !important;
	}
</style>
