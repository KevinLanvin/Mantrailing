<script lang="ts">
	import { onMount } from 'svelte'
	import { dogs } from '../stores/dogStore'
	import { getDogs } from '../domain/usecases/dogs/getDogs'
	import AddIcon from '../assets/icons/Add.svelte'
	onMount(getDogs)
</script>

<div class="dog-cards">
	<h3>Scores du mois dernier</h3>
	{#if $dogs.length}
		<div class="dogs">
			{#each $dogs as dog}
				<div class="dog-card">{dog.name}</div>
			{/each}
		</div>
	{:else}
		<a class="add-dog" href="/mon-compte">
			<AddIcon width="4rem" />
			<p>Tu n'as pas encore ajouté de chien à ton profil !</p>
    </a>
	{/if}
</div>

<style lang="scss">
	@import '../assets/styles/vars';
	@import '../assets/styles/main';

	.dog-cards {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.dogs {
			display: flex;
			gap: 1rem;
			.dog-card {
				padding: $gutter;
				border-radius: 1rem;
				&:nth-child(3n) {
					background-color: $main-color-2;
				}
				&:nth-child(3n + 1) {
					background-color: $main-color-3;
				}
				&:nth-child(3n + 2) {
					background-color: $main-color-4;
				}
			}
		}
		.add-dog {
			width: 100%;
			padding: $gutter;
			border-radius: $gutter;
			background-color: $main-color-1;
			color: $white;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			cursor: pointer;
		}
	}
</style>
