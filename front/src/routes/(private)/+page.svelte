<script lang="ts">
	import { disconnect } from '../../domain/usecases/login'
	import { user } from '../../stores/loginStore'

	const handleDisconnect = () => {
		disconnect()
	}
</script>

<div>HOME PAGE</div>
<div>{$user?.id}</div>
<div>{$user?.email}</div>
<div>{$user?.username}</div>
<button onclick={handleDisconnect}>Déconnexion</button>
<div class="actionBar"><a href="/mon-compte">Mon compte</a></div>

<style lang="scss">
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
