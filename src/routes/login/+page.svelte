<script>
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';
	import IconButton from '@smui/icon-button';

	let email = '';
	let password = '';
	let showPassword = false;

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};

	const handleSubmit = () => {
		// @ TODO: handle login
	};
</script>

<body>
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
					type={showPassword ? 'text' : 'password'}
				>
					<IconButton slot="trailingIcon" style="margin: 4px 4px 0;" on:click={toggleShowPassword}>
						<div class="icon">
							{#if showPassword}
								<IoMdEye />
							{:else}
								<IoMdEyeOff />
							{/if}
						</div>
					</IconButton>
				</Textfield>
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
</body>

<style>
	body {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		height: 100vh;
		margin: 0 !important;
		background-color: #ffe6e6;
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
	@media (min-width: 640px) {
		body {
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
		font-family: 'Open Sans', sans-serif;
		margin-top: 20px;
	}
	.icon {
		width: 28px;
		height: 28px;
		color: #4d50a1;
	}
</style>
