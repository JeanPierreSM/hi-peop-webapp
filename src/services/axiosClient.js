import { createAxiosClient } from './createAxiosClient';
import { goto } from '$app/navigation';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getCurrentAccessToken() {
	return localStorage.getItem('token');
}

async function logout() {
	localStorage.removeItem('token');
	goto('/login');
	return true;
}

export const client = createAxiosClient({
	options: {
		baseURL: BASE_URL,
		timeout: 300000,
		headers: {
			'Content-Type': 'application/json'
		}
	},
	getCurrentAccessToken,
	logout
});
