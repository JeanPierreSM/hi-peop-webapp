import { client } from './axiosClient';

/**
 * POST SERVICES
 */

export async function register(payload) {
	try {
		const response = await client.post('auth/register', payload, { notTokenNeeded: true });
		return response.data;
	} catch (error) {
		console.error('Error: ', error);
		throw error;
	}
}

export async function login(payload) {
	try {
		const response = await client.post('auth/login', payload, { notTokenNeeded: true });
		return response.data;
	} catch (error) {
		console.error('Error: ', error);
		throw error;
	}
}

// Add more as needed

/**
 * PUT SERVICES
 */
export async function updatePassword(payload) {
	try {
		const response = await client.put('user/update/password', payload);
		return response.data;
	} catch (error) {
		console.error('Error: ', error);
		throw error;
	}
}

// Add more as needed
