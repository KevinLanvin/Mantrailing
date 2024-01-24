<script>
	import { options } from '../store';
	import { onMount } from 'svelte';

	onMount(() =>
		options.update((state) => {
			return {
				...state,
				wind: 'front'
			};
		})
	);
	// @ts-ignore
	const handleWindDirectionChange = (event) => {
		options.update((state) => {
			return {
				...state,
				wind: event.target.value
			};
		});
	};
</script>

<select name="windPicker" id="windPicker" on:change={handleWindDirectionChange} value="front">
	<option value="front">De face</option>
	<option value="side">De côté</option>
	<option value="back">De dos</option>
</select>
