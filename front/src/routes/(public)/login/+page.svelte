<script lang="ts">
	import SubmitButton from '../../../components/form/SubmitButton.svelte'
import TextInput from '../../../components/form/TextInput.svelte'
	import { login } from '../../../domain/usecases/login'

	let username = $state('')
	let password = $state('')
	const handleSubmit = () => {
		login(username, password)
	}
</script>

<div class="loginContainer">
	<div class="illuContainer">
		<img src="/illu.jpg" alt="Chien reniflant une trace" class="illu" />
	</div>

	<form action="" onsubmit={handleSubmit} class="loginForm">
		<h1>Mantrailing<br /><span class="mini">App</span></h1>
		<div class="formGroup">
			<TextInput
				id="username"
				name="username"
				placeholder="Nom d'utilisateur"
				type="text"
				bind:value={username}
			/>
		</div>
		<div class="formGroup">
			<TextInput
				id="password"
				name="password"
				placeholder="Mot de passe"
				type="password"
				bind:value={password}
			/>
		</div>
		<div class="formGroup">
			<SubmitButton label="Se connecter" onsubmit={handleSubmit} />
		</div>
		<div class="formGroup">
			<a href="/signup" class="signup-message">Pas encore inscrit ? Par ici !</a>
		</div>
	</form>
</div>

<style lang="scss">
	@import '../../../assets/styles/main.scss';
	@import '../../../assets/styles/_vars.scss';

	.loginContainer {
		width: 100%;
		height: 100%;
		max-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.illuContainer {
		width: 100%;
		flex: 1;
		overflow: hidden;
		.illu {
			object-fit: cover;
			object-position: center 30%;
			width: 100%;
			height: 100%;
			display: block;
		}
	}

	.loginForm {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		background-color: $neutral-color-dark;
		position: relative;
		position: relative;
		padding: 0 2rem 2rem 2rem;
		z-index: 10;
		&::before {
			content: url('round.svg');
			position: absolute;
			bottom: 100%;
			left: 0;
			width: 100%;
			z-index: -1;
			aspect-ratio: 12;
			max-height: min-content;
		}
		h1 {
			color: $white;
			text-align: center;
			line-height: 0.4em;
			text-shadow:
				2px 0 $neutral-color-dark,
				-2px 0 $neutral-color-dark,
				0 2px $neutral-color-dark,
				0 -2px $neutral-color-dark,
				1px 1px $neutral-color-dark,
				-1px -1px $neutral-color-dark,
				1px -1px $neutral-color-dark,
				-1px 1px $neutral-color-dark;
			font-size: 3.25rem;
			.mini {
				font-size: 2.5rem;
			}
			margin: 2rem 0;
		}
		.formGroup {
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		.signup-message {
			color: $white;
			text-align: center;
			font-weight: 700;
		}
	}
</style>
