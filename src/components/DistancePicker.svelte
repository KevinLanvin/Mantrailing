<script>
	import { onMount } from 'svelte'
	import { trackConfig } from '../store'

	onMount(() =>
		trackConfig.update((state) => {
			return {
				...state,
				distance: 20
			}
		})
	)
	// @ts-ignore
	const handleDistanceChange = (event) => {
		trackConfig.update((state) => {
			return {
				...state,
				distance: event.target.value
			}
		})
	}
</script>

<div class="distancePicker">
	<h3>
		<label for="distance">Distance</label>
	</h3>
	<input
		type="range"
		id="distance"
		name="distance"
		min="0"
		max="2000"
		value="20"
		on:change={handleDistanceChange}
		list="availableDistances"
	/>
	<datalist id="availableDistances">
		<option value="0" label="0m"></option>
		<option value="20" label="20m"></option>
		<option value="100" label="100m"></option>
		<option value="200" label="200m"></option>
		<option value="500" label="500m"></option>
		<option value="1000" label="1000m"></option>
		<option value="1500" label="1500m"></option>
	</datalist>
</div>

<style lang="scss">
	.distancePicker {
		width: 100%;
		input {
			width: 100%;
		}
	}
	datalist {
		display: flex;
		width: 100%;
		justify-content: space-between;
		gap: 1em;
	}
</style>
