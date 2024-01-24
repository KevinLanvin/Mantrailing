<script>
	import { options } from '../store';
	import { onMount } from 'svelte';

	onMount(() =>
		options.update((state) => {
			return {
				...state,
				windForce: 0
			};
		})
	);
	// @ts-ignore
	const handleWindForceChange = (event) => {
		options.update((state) => {
			return {
				...state,
				windForce: event.target.value
			};
		});
	};
</script>

<input
	type="range"
	id="windForce"
	name="windForce"
	min="0"
	max="100"
	on:change={handleWindForceChange}
	value="0"
/>
<label for="windForce">Force du vent</label>
