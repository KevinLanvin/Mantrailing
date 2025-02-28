<script>
	import { WindDirection } from '../domain/entities/ScoreScale'
	import { trackConfig } from '../stores/scoreStore'
	import { onMount } from 'svelte'

	onMount(() =>
		trackConfig.update((state) => {
			return {
				...state,
				windDirection: WindDirection.FRONT
			}
		})
	)
	// @ts-ignore
	const handleWindDirectionChange = (event) => {
		trackConfig.update((state) => {
			return {
				...state,
				wind: event.target.value
			}
		})
	}
</script>

<div class="windDirectionPicker">
	<h3>Direction du vent</h3>
	<div class="input">
		<div>
			<input
				type="radio"
				id="windDirectionFront"
				name="windDirection"
				value="front"
				onchange={handleWindDirectionChange}
			/>
			<label for="windDirectionFront">De face</label>
		</div>
		<div>
			<input
				type="radio"
				id="windDirectionSide"
				name="windDirection"
				value="side"
				onchange={handleWindDirectionChange}
			/>
			<label for="windDirectionSide">De côté</label>
		</div>
		<div>
			<input
				type="radio"
				id="windDirectionBack"
				name="windDirection"
				value="back"
				onchange={handleWindDirectionChange}
			/>
			<label for="windDirectionBack">De dos</label>
		</div>
	</div>
</div>

<style lang="scss">
	.windDirectionPicker {
		.input {
			display: grid;
			gap: 1em;
			grid-template-columns: 1fr 1fr 1fr;
			div {
				border: 1px solid black;
			}
		}
		input {
			display: none;
			&:checked + label {
				background-color: #ccc;
			}
		}
		label {
			display: block;
			width: 100%;
			text-align: center;
			padding: 0.5em;
			box-sizing: border-box;
		}
	}
</style>
