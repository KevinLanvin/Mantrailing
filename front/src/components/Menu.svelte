<script>
	import Friends from '../assets/icons/Friends.svelte'
	import Home from '../assets/icons/Home.svelte'
	import Settings from '../assets/icons/Settings.svelte'
	import Tracks from '../assets/icons/Tracks.svelte'
</script>

<footer>
	<a href="#" class="main-button">Créer une trace</a>
	<a href="" class="secondary-button accueil-button"><Home />Accueil</a>
	<a href="" class="secondary-button traces-button"><Tracks />Traces</a>
	<a href="" class="secondary-button amis-button"><Friends />Amis</a>
	<a href="" class="secondary-button profil-button"><Settings />Profil</a>
</footer>

<style lang="scss">
	@import '../assets/styles/vars';
	@import '../assets/styles/main';

	footer {
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		.main-button {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 6rem;
			height: 6rem;
			font-size: 0.625rem;
			clip-path: circle(50%);
			color: $white;
			background-color: $neutral-color-dark;
			anchor-name: --main-button;
			position: relative;
		}
		.secondary-button {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 3rem;
			height: 3rem;
			font-size: 0.625rem;
			border-radius: 100%;
			border: 1px solid $neutral-color-light;
			color: $neutral-color-dark;
			background-color: $white;
			position: absolute;
			position-anchor: --main-button;
		}
		.accueil-button {
			transform: translate(-160%, -80%);
		}
		.traces-button {
			transform: translate(-60%, -170%);
		}
		.amis-button {
			transform: translate(60%, -170%);
		}
		.profil-button {
			transform: translate(160%, -80%);
		}
	}
</style>
