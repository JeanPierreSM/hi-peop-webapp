<script lang="ts">
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';

	let email = '';
	let password = '';

	const handleSubmit = () => {
		console.log('email: ', email);
		console.log('password: ', password);
	};
</script>

<main>
	<img class="logo" src="hipeop-logo.png" alt="logo" style="width: 200px;" />
	<div class="form-card-container">
		<Card variant="outlined" padded>
			<div class="login-box">Iniciar sesión</div>
			<form on:submit|preventDefault={handleSubmit}>
				<Textfield
					style="margin-bottom: 20px;"
					variant="outlined"
					bind:value={email}
					label="Email"
				/>
				<Textfield
					style="margin-bottom: 20px;"
					variant="outlined"
					bind:value={password}
					label="Contraseña"
				/>
				<Button
					style="margin-top: 30px; background: linear-gradient(to right, #4D50A1, #DD2792); color: white; border-radius: 10px; height: 45px; font-weight: bold;"
					variant="raised"
				>
					<Label>Ingresar</Label>
				</Button>
				<p class="dont-have-account-box">
					¿No tenés una cuenta? <a href="/signup">Registrate aquí</a>
				</p>
			</form>
		</Card>
	</div>
</main>

<style>
	main {
		background-image: url('/signup-background.jpg');
		 background-size: cover;
	}
	.login-box {
		height: 50px;
		color: #4d50a1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		font-size: 25px;
		font-weight: bold;
	}
	.form-card-container {
		display: flex;
		flex-direction: column;
		max-width: 420px;
		margin: 4rem auto;
		border-radius: 10px;
		box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
	}
	form {
		display: flex;
		flex-direction: column;
		padding: 15px 15px 0 15px;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #ffe6e6;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	.logo {
		width: 100px;
		height: auto;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
	.dont-have-account-box {
		font-size: 15px; 
		font-weight: 400;
		font-family: "Open Sans", sans-serif;
		margin-top: 20px;
	}
</style>
