<script>
	let username, password;

	const handleSubmit = () => {
		console.log('username: ', username);
		console.log('password: ', password);
	};
</script>

<main>
	<img class="logo" src="hipeop-logo.png" alt="logo" style="width: 400px;" />
	<p style="font-size: 18px; font-weight: 500">Transparencia | Visibilidad | Trazabilidad</p>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="username">Nombre de usuario</label>
		<input type="text" id="username" bind:value={username} required />

		<label for="password">Contraseña</label>
		<input type="password" id="password" bind:value={password} required />

		<button type="submit" style="margin-top: 50px;">Iniciar Sesion</button>
	</form>
	<a href="/" style="font-size: 15px; font-weight: 400">Olvidé mi contraseña</a>
	<p style="font-size: 15px; font-weight: 400">¿No tenés una cuenta? <a href="/">Contactános</a></p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #ffe6e6;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		margin: 8rem auto;
	}

	label {
		margin-bottom: 0.5rem;
		text-align: left;
	}

	input {
		margin-bottom: 1rem;
		padding: 0.5rem;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
	}
	.logo {
		width: 100px;
		height: auto;
		margin-bottom: 1rem;
	}
</style>
