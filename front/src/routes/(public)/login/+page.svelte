<script lang="ts">
	import { login } from '../../../domain/usecases/login'

	let username = ''
	let password = ''
	const handleSubmit = () => {
		login(username, password)
	}
</script>

<div class="loginContainer">
	<div class="illuContainer">
		<img src="/illu.jpg" alt="Chien reniflant une trace" class="illu" />
	</div>

	<form action="" on:submit={handleSubmit} class="loginForm">
		<h1>Mantrailing<br /><span class="mini">App</span></h1>
		<div class="formGroup">
			<label for="username">Nom d'utilisateur</label>
			<input
				type="text"
				placeholder="Nom d'utilisateur"
				name="username"
				id="username"
				bind:value={username}
			/>
		</div>
		<div class="formGroup">
			<label for="password">Mot de passe</label>
			<input
				type="password"
				placeholder="Mot de passe"
				name="password"
				id="password"
				bind:value={password}
			/>
		</div>
		<a href="/signup">S'inscrire</a>
		<button type="submit">Connexion</button>
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
		background-color: #f80;
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
		gap: 2rem;
		width: 100%;
		background-color: $neutral-color-dark;
		position: relative;
		border-radius: 100% 100% 0px 0px / 50px 50px 0px 0px;
		padding-top: 50px;
		margin-top: -50px;
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
		}
		.formGroup {
			display: flex;
			flex-direction: column;
		}
	}
</style>
