<script lang="ts">
	import { signup } from '../../../domain/usecases/login'

	let username = $state('')
	let password = $state('')
	let email = $state('')

	const handleSubmit = () => {
		signup(username, email, password)
	}
</script>

<div class="signupContainer">
	<form action="" onsubmit={handleSubmit} class="signupForm">
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
			<label for="username">Email</label>
			<input type="email" placeholder="Email" name="email" id="email" bind:value={email} />
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
		<button type="submit">S'inscrire</button>
	</form>
</div>

<style lang="scss">
	.signupContainer {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signupForm {
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
