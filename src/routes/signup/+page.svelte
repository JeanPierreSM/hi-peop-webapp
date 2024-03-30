<script lang="ts">
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';

	let checked = false;

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let selectedCheckbox = 'recruiter';

	const handleSubmit = () => {
		console.log('firstName: ', firstName);
		console.log('lastName: ', lastName);
		console.log('email: ', email);
		console.log('password: ', password);
		console.log('confirmPassword: ', confirmPassword);
		console.log('selectedCheckbox: ', selectedCheckbox);
	};

    const handleCheckboxChange = (option) => {
        selectedCheckbox = option; // Update selected option
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
                    type="password"
				/>
				<Textfield
					style="margin-bottom: 20px; "
					variant="outlined"
					bind:value={confirmPassword}
					label="Confirmar contraseña"
                    type="password"
				/>
				<div style="display: flex; align-items: center;">
                    <div style="margin-right: 85px;">
                        <FormField>
                            <Checkbox checked={selectedCheckbox === 'recruiter'} on:change={() => handleCheckboxChange('recruiter')} />
                            <span slot="label">Soy Recruiter</span>
                        </FormField>
                    </div>
                    <div>
                        <FormField>
                            <Checkbox checked={selectedCheckbox === 'candidate'} on:change={() => handleCheckboxChange('candidate')}  />
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
		max-width: 420px;
		margin: 2rem auto;
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
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.dont-have-account-box {
		font-size: 15px;
		font-weight: 400;
		font-family: 'Open Sans', sans-serif;
		margin-top: 20px;
	}
</style>
