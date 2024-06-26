<script>
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';
	import IconButton from '@smui/icon-button';
	import * as yup from 'yup';
	import triggerYupValidation from '../../utils/triggerYupValidation';
	import HelperText from '../../components/HelperText.svelte';
	import CircularProgress from '@smui/circular-progress';
	import { goto } from '$app/navigation';
	import { login } from '../../services/services';

	let email = '';
	let password = '';
	let showPassword = false;
	let errors = {};
	let loginErrorMsg = null;
	let loadingLogin = false;

	const loginSchema = yup.object().shape({
		email: yup
			.string()
			.email('Email inválido')
			.max(50, 'El email no debe tener más de 50 caracteres')
			.required('Email es un campo requerido'),
		password: yup
			.string()
			.max(50, 'La contraseña no debe tener más de 50 caracteres')
			.required('Contraseña es un campo requerido')
	});

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await loginSchema.validate({ email, password }, { abortEarly: false });
			errors = {};
			const payload = { email, password };
			loadingLogin = true;
			const data = await login(payload);
			const newToken = data.Authorization;
			localStorage.setItem('token', newToken);
			localStorage.setItem('user', JSON.stringify(data.data));
			goto('/home/overview');
		} catch (error) {
			if (error.inner) {
				// handle yup validation errors
				errors = error.inner.reduce((acc, curr) => {
					acc[curr.path] = curr.message;
					return acc;
				}, {});
			} else if (error.response?.data?.message) {
				// handle API calls errors
				loginErrorMsg = error.response.data.message;
			}
		} finally {
			loadingLogin = false;
		}
	};

	$: {
		if (email !== '') triggerYupValidation(loginSchema, errors, 'email', email);
	}
	$: {
		if (password !== '') triggerYupValidation(loginSchema, errors, 'password', password);
	}
</script>

<body>
	<img class="w-48 mx-auto mt-8 mb-8" src="hipeop-logo.png" alt="logo" />
	{#if loginErrorMsg}
		<div class="error-msg-box">
			<p class="error-msg">Error al iniciar sesión: {loginErrorMsg}</p>
			<button
				class="close-btn"
				on:click={() => {
					loginErrorMsg = null;
				}}>✕</button
			>
		</div>
	{/if}
	<div class="form-card-container">
		<Card variant="outlined" padded>
			<div class="login-box">Iniciar sesión</div>
			<form>
				<Textfield
					style="margin-bottom: 5px;"
					variant="outlined"
					bind:value={email}
					label="Email"
				/>
				{#if errors.email}
					<HelperText error={errors.email} />
				{/if}
				<Textfield
					style="margin-top: 20px; margin-bottom: 5px;"
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
				{#if errors.password}
					<HelperText error={errors.password} />
				{/if}
				<Button
					style="margin-top: 60px; background: linear-gradient(to right, #4D50A1, #DD2792); color: white; border-radius: 10px; height: 45px; font-weight: bold;"
					variant="raised"
					on:click={handleSubmit}
					disabled={loadingLogin}
				>
					{#if loadingLogin}
						<CircularProgress
							style="height: 16px; width: 16px; margin-right: 16px;"
							indeterminate
						/>
					{/if}
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
	.error-msg-box {
		background-color: #ff6666;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 390px;
		margin: auto;
		color: white;
		padding: 20px;
		border-radius: 5px;
		margin-bottom: 20px;
		position: relative;
	}

	.error-msg {
		margin: 0;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		margin-bottom: 10px;
	}

	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		color: white;
		font-size: 18px;
		cursor: pointer;
		padding: 5px;
	}
</style>
