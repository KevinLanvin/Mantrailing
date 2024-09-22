<script>
	import { trackConfig } from '../stores/scoreStore'
	import { onMount } from 'svelte'

	onMount(() =>
		trackConfig.update((state) => {
			return {
				...state,
				temperature: 15
			}
		})
	)
	// @ts-ignore
	const handleTemperatureChange = (event) => {
		trackConfig.update((state) => {
			return {
				...state,
				temperature: event.target.value
			}
		})
	}
</script>

<div class="temperaturePicker">
	<h3>
		<label for="temperature">Température</label>
	</h3>
	<input
		type="range"
		id="temperature"
		name="temperature"
		min="-10"
		max="30"
		value="15"
		on:change={handleTemperatureChange}
		list="availableTemperatures"
	/>
	<datalist id="availableTemperatures">
		<option value="-10" label="-10°"></option>
		<option value="0" label="0°"></option>
		<option value="10" label="10°"></option>
		<option value="15" label="15°"></option>
		<option value="20" label="20°"></option>
		<option value="30" label="30°"></option>
	</datalist>
</div>

<style lang="scss">
	.temperaturePicker {
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
