<script>
	import { onMount } from 'svelte'
	import Geoloc from '../components/Geoloc.svelte'
	import Map from '../components/Map.svelte'
	import MoisturePicker from '../components/MoisturePicker.svelte'
	import Score from '../components/Score.svelte'
	import TemperaturePicker from '../components/TemperaturePicker.svelte'
	import WindDirectionPicker from '../components/WindDirectionPicker.svelte'
	import WindForcePicker from '../components/WindForcePicker.svelte'
	import { currentCoordinates, path } from '../stores/pathStore'
	import fakePath from '../track.json'

	onMount(() => {
		setTimeout(() => {
			path.set(fakePath)
			currentCoordinates.set(fakePath[fakePath.length - 1])
		}, 2000)
	})
</script>

<Map />
<!-- <Geoloc /> -->
<Score />
<!-- <WindDirectionPicker />
<WindForcePicker />
<TemperaturePicker />
<MoisturePicker />
<DistancePicker /> -->
