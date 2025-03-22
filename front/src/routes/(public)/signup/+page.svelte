<script lang="ts">
	import SubmitButton from '../../../components/form/SubmitButton.svelte'
	import TextInput from '../../../components/form/TextInput.svelte'
	import { signup } from '../../../domain/usecases/login'

	let username = $state('')
	let password = $state('')
	let email = $state('')

	const handleSubmit = () => {
		signup(username, email, password)
	}
</script>

<div class="signupContainer">
	<div class="illuContainer">
		<img src="/illu.jpg" alt="Chien reniflant une trace" class="illu" />
	</div>
	<form action="" onsubmit={handleSubmit} class="signupForm">
		<h1>Mantrailing<br /><span class="mini">App</span></h1>
		<div class="formGroup">
			<TextInput
				type="text"
				placeholder="Nom d'utilisateur"
				name="username"
				id="username"
				bind:value={username}
			/>
		</div>
		<div class="formGroup">
			<TextInput type="email" placeholder="Email" name="email" id="email" bind:value={email} />
		</div>
		<div class="formGroup">
			<TextInput
				type="password"
				placeholder="Mot de passe"
				name="password"
				id="password"
				bind:value={password}
			/>
		</div>
		<div class="formGroup">
			<SubmitButton label="S'inscrire" onsubmit={handleSubmit} />
		</div>
		<div class="formGroup">
			<a href="/login" class="signup-message">Déjà un compte ? Par ici !</a>
		</div>
	</form>
</div>

<style lang="scss">
	@import '../../../assets/styles/main.scss';
	@import '../../../assets/styles/_vars.scss';

	.signupContainer {
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
	.signupForm {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		background-color: $neutral-color-dark;
		position: relative;
		position: relative;
		padding: 0 $gutter 4rem $gutter;
		z-index: 10;
		&::before {
			content: url('round.svg');
			position: absolute;
			bottom: calc(100% - 1px);
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
