<script>
	import { onMount } from 'svelte'
	import { trackConfig } from '../stores/scoreStore'

	onMount(() =>
		trackConfig.update((state) => {
			return {
				...state,
				windForce: 0
			}
		})
	)
	// @ts-ignore
	const handleWindForceChange = (event) => {
		trackConfig.update((state) => {
			return {
				...state,
				windForce: event.target.value
			}
		})
	}
</script>

<div class="windForcePicker">
	<h3>
		<label for="windForce">Force du vent</label>
	</h3>
	<input
		type="range"
		id="windForce"
		name="windForce"
		min="0"
		max="100"
		on:change={handleWindForceChange}
		value="0"
		list="availableWindForces"
	/>
	<datalist id="availableWindForces">
		<option value="0" label="Pas de vent"></option>
		<option value="50" label="50km/h"></option>
		<option value="70" label="70km/h"></option>
		<option value="100" label="100km/h"></option>
	</datalist>
</div>

<style lang="scss">
	.windForcePicker {
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
		option:first-of-type {
			flex-grow: 1;
		}
	}
</style>
