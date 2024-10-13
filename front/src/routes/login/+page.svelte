<script lang="ts">
	import { login } from '../../domain/usecases/login'

	let username = ''
	let password = ''
	const handleSubmit = () => {
		login(username, password)
	}
</script>

<div class="loginContainer">
	<form action="" on:submit={handleSubmit} class="loginForm">
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
		<button type="submit">Connexion</button>
	</form>
</div>

<style lang="scss">
	.loginContainer {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loginForm {
		display: flex;
		flex-direction: column;
		max-width: 499px;
		margin: auto 1rem;
		.formGroup {
			display: flex;
			flex-direction: column;
		}
	}
</style>
