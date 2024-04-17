<script>
	import Button, { Label } from '@smui/button';
	import { goto } from '$app/navigation';
	import { updatePassword } from '../../services/services';

	async function logout() {
		localStorage.removeItem('token');
		goto('/login');
		return true;
	}
</script>

<body>
	<div
		style="display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center; 
                height: 200px;
                margin-top: 50px;
                font-family: Arial, sans-serif; 
                font-size: 24px; 
                padding: 20px; 
                border: 2px solid #333; 
                background-color: #f0f0f0;"
	>
		Bienvenido a la home!
	</div>
	<div style="display: flex; justify-content: center; align-items: center; margin-top: 30px;">
		<Button
			style="background: linear-gradient(to right, #4D50A1, #DD2792); 
                    color: white; 
                    border-radius: 10px; 
                    height: 45px; 
                    font-weight: bold;
                    width: 200px;"
			variant="raised"
			on:click={() => logout()}
		>
			<Label>Cerrar sesión</Label>
		</Button>
	</div>
	<div style="display: flex; justify-content: center; align-items: center; margin-top: 30px;">
		<Button
			style="background: linear-gradient(to right, #4D50A1, #DD2792); 
                    color: white; 
                    border-radius: 10px; 
                    height: 45px; 
                    font-weight: bold;
                    width: 200px;"
			variant="raised"
			on:click={async () => {
				const payload = {
					oldPassword: 'integracion3',
					newPassword: 'integracion'
				};
				await updatePassword(payload);
			}}
		>
			<Label>TEST JWT AGAINST UPDATE PASSWORD</Label>
		</Button>
	</div>
</body>
