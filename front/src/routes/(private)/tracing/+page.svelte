<script>
	import { onMount } from 'svelte'
	import Map from '../../../components/Map.svelte'
	import Score from '../../../components/Score.svelte'
	import { currentCoordinates, path } from '../../../stores/pathStore'
	import fakePath from '../../../track.json'
	import 'iconify-icon'

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
