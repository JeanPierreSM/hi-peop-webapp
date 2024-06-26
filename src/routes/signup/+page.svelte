<script>
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';
	import IconButton from '@smui/icon-button';
	import * as yup from 'yup';
	import triggerYupValidation from '../../utils/triggerYupValidation';
	import HelperText from '../../components/HelperText.svelte';
	import { goto } from '$app/navigation';
	import PopupDialog from '../../components/PopupDialog.svelte';
	import CircularProgress from '@smui/circular-progress';
	import { register } from '../../services/services';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let selectedUserType = 'recruiter';
	let showPassword = false;
	let errors = {};
	let openSignupSuccessPopup = false;
	let signupErrorMsg = null;
	let loadingSignup = false;

	const signupSchema = yup.object().shape({
		firstName: yup
			.string()
			.max(50, 'El Nombre no debe tener más de 50 caracteres')
			.required('Nombre es un campo requerido'),
		lastName: yup
			.string()
			.max(50, 'El Apellido no debe tener más de 50 caracteres')
			.required('Apellido es un campo requerido'),
		email: yup
			.string()
			.email('Email inválido')
			.max(50, 'El email no debe tener más de 50 caracteres')
			.required('Email es un campo requerido'),
		password: yup
			.string()
			.max(50, 'La contraseña no debe tener más de 50 caracteres')
			.required('Contraseña es un campo requerido'),
		confirmPassword: yup
			.string()
			.max(50, 'La contraseña no debe tener más de 50 caracteres')
			.required('Confirmar Contraseña es un campo requerido')
			.oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
	});

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};

	const handleCheckboxChange = (option) => {
		selectedUserType = option;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await signupSchema.validate(
				{ firstName, lastName, email, password, confirmPassword },
				{ context: { password }, abortEarly: false }
			);
			errors = {};
			const payload = {
				firstName,
				lastName,
				email,
				password,
				userType: selectedUserType
			};
			loadingSignup = true;
			const data = await register(payload);
			const newToken = data.Authorization;
			localStorage.setItem('token', newToken);
			localStorage.setItem('user', JSON.stringify(data.data));
			openSignupSuccessPopup = true;
		} catch (error) {
			if (error.inner) {
				// handle yup validation errors
				errors = error.inner.reduce((acc, curr) => {
					acc[curr.path] = curr.message;
					return acc;
				}, {});
			} else if (error.response?.data?.message) {
				// handle API calls errors
				signupErrorMsg = error.response.data.message;
			}
		} finally {
			loadingSignup = false;
		}
	};

	$: {
		if (firstName !== '') triggerYupValidation(signupSchema, errors, 'firstName', firstName);
	}
	$: {
		if (lastName !== '') triggerYupValidation(signupSchema, errors, 'lastName', lastName);
	}
	$: {
		if (email !== '') triggerYupValidation(signupSchema, errors, 'email', email);
	}
	$: {
		if (password !== '') triggerYupValidation(signupSchema, errors, 'password', password);
	}
	$: {
		if (confirmPassword !== '')
			triggerYupValidation(signupSchema, errors, 'confirmPassword', confirmPassword);
	}
</script>

<body>
	<img class="w-48 mx-auto mt-8 mb-8" src="hipeop-logo.png" alt="logo" />
	{#if signupErrorMsg}
		<div class="error-msg-box">
			<p class="error-msg">Error al crear cuenta: {signupErrorMsg}</p>
			<button
				class="close-btn"
				on:click={() => {
					signupErrorMsg = null;
				}}>✕</button
			>
		</div>
	{/if}
	<div class="form-card-container">
		<Card variant="outlined" padded>
			<div class="signup-box">Crea tu cuenta. Gratis.</div>
			<form>
				<div style="display: flex; justify-content: space-between;">
					<div style="width: 48%;">
						<Textfield
							style="margin-bottom: 5px;"
							variant="outlined"
							bind:value={firstName}
							label="Nombre"
						/>
						{#if errors.firstName}
							<HelperText error={errors.firstName} />
						{/if}
					</div>

					<div style="width: 48%;">
						<Textfield
							style="margin-bottom: 5px;"
							variant="outlined"
							bind:value={lastName}
							label="Apellido"
						/>
						{#if errors.lastName}
							<HelperText error={errors.lastName} />
						{/if}
					</div>
				</div>
				<Textfield
					style="margin-top: 20px; margin-bottom: 5px;"
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
				<Textfield
					style="margin-top: 20px; margin-bottom: 5px;"
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
				{#if errors.confirmPassword}
					<HelperText error={errors.confirmPassword} />
				{/if}
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
					on:click={handleSubmit}
					disabled={loadingSignup}
				>
					{#if loadingSignup}
						<CircularProgress
							style="height: 16px; width: 16px; margin-right: 16px;"
							indeterminate
						/>
					{/if}
					<Label>Registrarse</Label>
				</Button>
				<p class="dont-have-account-box">
					¿Ya tenés una cuenta? <a href="/login">Inicia sesión</a>
				</p>
			</form>
		</Card>
	</div>
	<PopupDialog
		open={openSignupSuccessPopup}
		type="success"
		title="Cuenta creada exitosamente"
		bodyText="Su cuenta se ha creado con éxito."
		okText="Ok"
		onOkClick={() => {
			openSignupSuccessPopup = false;
			goto('/home/overview');
		}}
	/>
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
