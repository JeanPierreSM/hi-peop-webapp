<script>
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';
	import IconButton from '@smui/icon-button';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let selectedUserType = 'recruiter';
	let showPassword = false;

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};

	const handleCheckboxChange = (option) => {
		selectedUserType = option;
	};

	const handleSubmit = () => {
		// @ TODO: handle signup
	};
</script>

<body>
	<img class="logo" src="hipeop-logo.png" alt="logo" style="width: 200px;" />
	<div class="form-card-container">
		<Card variant="outlined" padded>
			<div class="signup-box">Crea tu cuenta. Gratis.</div>
			<form on:submit|preventDefault={handleSubmit}>
				<div style="display: flex; justify-content: space-between;">
					<Textfield
						style="margin-bottom: 20px; width: 48%;"
						variant="outlined"
						bind:value={firstName}
						label="Nombre"
					/>
					<Textfield
						style="margin-bottom: 20px; width: 48%;"
						variant="outlined"
						bind:value={lastName}
						label="Apellido"
					/>
				</div>
				<Textfield
					style="margin-bottom: 20px; "
					variant="outlined"
					bind:value={email}
					label="Email"
				/>
				<Textfield
					style="margin-bottom: 20px; "
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
				<Textfield
					style="margin-bottom: 20px; "
					variant="outlined"
					bind:value={confirmPassword}
					label="Confirmar contraseña"
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
				<div style="display: flex; align-items: center;">
					<div style="margin-right: 155px;">
						<FormField>
							<Checkbox
								checked={selectedUserType === 'recruiter'}
								on:change={() => handleCheckboxChange('recruiter')}
							/>
							<span slot="label">Soy Recruiter</span>
						</FormField>
					</div>
					<div>
						<FormField>
							<Checkbox
								checked={selectedUserType === 'candidate'}
								on:change={() => handleCheckboxChange('candidate')}
							/>
							<span slot="label">Soy Aspirante</span>
						</FormField>
					</div>
				</div>
				<Button
					style="margin-top: 30px; background: linear-gradient(to right, #4D50A1, #DD2792); color: white; border-radius: 10px; height: 45px; font-weight: bold;"
					variant="raised"
				>
					<Label>Registrarse</Label>
				</Button>
				<p class="dont-have-account-box">
					¿Ya tenés una cuenta? <a href="/login">Inicia sesión</a>
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
	@media (min-width: 640px) {
		body {
			max-width: none;
		}
	}
	.signup-box {
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
		max-width: 490px;
		margin: 2rem auto;
		border-radius: 10px;
		box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
	}
	form {
		display: flex;
		flex-direction: column;
		padding: 15px 15px 0 15px;
	}
	.logo {
		width: 100px;
		height: auto;
		margin-top: 1rem;
		margin-bottom: 1rem;
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
