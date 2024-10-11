<script>
	import { MoistureLevel } from '../domain/entities/ScoreScale'
	import { trackConfig } from '../stores/scoreStore'
	import { onMount } from 'svelte'

	onMount(() =>
		trackConfig.update((state) => {
			return {
				...state,
				moisture: MoistureLevel.MOIST
			}
		})
	)
	// @ts-ignore
	const handleMoistureChange = (event) => {
		trackConfig.update((state) => {
			return {
				...state,
				moisture: event.target.value
			}
		})
	}
</script>

<div class="moisturePicker">
	<h3>Humidité</h3>
	<div class="input">
		<div>
			<input
				type="radio"
				id="moistureWet"
				name="moisture"
				value="wet"
				on:change={handleMoistureChange}
			/>
			<label for="moistureWet">Humide</label>
		</div>
		<div>
			<input
				type="radio"
				id="moistureDry"
				name="moisture"
				value="dry"
				on:change={handleMoistureChange}
			/>
			<label for="moistureDry">Sec</label>
		</div>
		<div>
			<input
				type="radio"
				id="moistureWarm"
				name="moisture"
				value="warm"
				on:change={handleMoistureChange}
			/>
			<label for="moistureWarm">Désertique</label>
		</div>
	</div>
</div>

<style lang="scss">
	.moisturePicker {
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
