<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
	import FaRegBell from 'svelte-icons/fa/FaRegBell.svelte';
	import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte';

	let user = null;

	onMount(() => {
		const userData = localStorage.getItem('user');
		if (userData) {
			user = JSON.parse(userData);
		}
	});
	async function logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		goto('/login');
		return true;
	}

</script>

<div class="sticky-bar">
	<span class="content"/>
	<span class="right-content">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span class="logout-icon" role="button" tabindex="0" on:click={() => logout()}>
			<FaSignOutAlt />
		</span>
		<span class="bell-icon">
			<FaRegBell />
		</span>

		{#if user}
			<span class="circle"
				>{`${user.firstName[0]?.toUpperCase()}${user.lastName[0]?.toUpperCase()}`}</span
			>
		{:else}
			<span class="circle">HP</span>
		{/if}

		<span class="chevron-icon">
			<FaChevronDown />
		</span>
	</span>
</div>

<nav class="left-nav">
	<img class="logo" src="../hipeop-logo.png" alt="logo" style="width: 200px;" />
	<ul>
		<li>
			<a href="/home/overview">Mis Procesos</a>
		</li>
		<li>
			<a href="/home/mails">Mails</a>
		</li>
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	.sticky-bar {
		position: sticky;
		top: 0;
		background-color: white;
		color: #333;
		padding: 10px;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.right-content {
		display: flex;
		align-items: center;
	}

	.logout-icon {
		width: 20px;
		height: 20px;
		color: #4d50a1;
		margin-right: 40px;
	}

	.bell-icon {
		width: 20px;
		height: 20px;
		color: #4d50a1;
		margin-right: 40px;
	}

	.chevron-icon {
		width: 20px;
		height: 20px;
		margin-right: 20px;
		color: #4d50a1;
	}

	 .circle {
		background-color: #4d50a1;
		color: white;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		margin-right: 20px;
	}

	.left-nav {
		background-color: #4d50a1;
		color: white;
		width: 250px;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		overflow-x: hidden;
		padding-top: 20px;
	}

	.left-nav ul {
		list-style-type: none;
		padding: 0;
	}

	.left-nav ul li {
		padding: 10px;
	}

	.left-nav ul li a {
		text-decoration: none;
		color: inherit;
		display: block;
		padding: 10px 20px;
		transition: background-color 0.3s;
	}

	.left-nav ul li a:hover {
		background-color: #3e4082;
	}

	.logo {
		display: block;
		margin: 0 auto;
		padding-bottom: 20px;
	}

	main {
		padding-left: 270px;
	}
</style>
