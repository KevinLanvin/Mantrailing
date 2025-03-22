<script>
	import { user } from '../stores/loginStore'
</script>

<header>
	<div class="profile">
		<img src="avatar.svg" alt="avatar" />
		<h1>Hello {$user?.username}</h1>
	</div>
	<div class="actions">
		<!-- TODO Reprendre la trace en cours -->
		<img src="hello-dog.svg" alt="Dog saying hello" />
	</div>
</header>

<style lang="scss">
	@import '../assets/styles/vars';

	header {
		background-color: $neutral-color-dark;
		padding: $gutter;
		padding-bottom: $gutter+$panel-radius;
		margin-bottom: -$panel-radius;
		position: relative;
		.profile {
			display: flex;
			gap: 1rem;
			width: 100%;
			align-items: center;
			img {
				display: block;
				width: 4em;
				height: 4em;
			}
			h1 {
				color: $white;
			}
		}
		.actions {
			height: 2em;
			img {
				position: absolute;
				left: 30%;
        z-index: 3;
			}
		}
	}
</style>
