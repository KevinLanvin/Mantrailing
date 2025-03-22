<script lang="ts">
	import DogCards from '../../components/DogCards.svelte'
import HomeHeader from '../../components/HomeHeader.svelte'
import { disconnect } from '../../domain/usecases/login'
	import { user } from '../../stores/loginStore'

	const handleDisconnect = () => {
		disconnect()
	}
</script>

<HomeHeader />
<main>
	<DogCards />
	<div>HOME PAGE</div>
	<div>{$user?.id}</div>
	<div>{$user?.email}</div>
	<div>{$user?.username}</div>
	<button onclick={handleDisconnect}>Déconnexion</button>
</main>
<div class="actionBar"><a href="/mon-compte">Mon compte</a></div>

<style lang="scss">
	@import '../../assets/styles/vars';

	main {
		border-radius: $panel-radius;
		padding: $gutter;
		padding-top: 1.25*$gutter;
		background-color: white;
		position: relative;
	}
	.actionBar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		background-color: lightgray;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
