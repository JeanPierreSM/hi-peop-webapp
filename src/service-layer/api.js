import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getData(endpoint) {
	try {
		const response = await axios.get(`${BASE_URL}/${endpoint}`);
		return response.data;
	} catch (error) {
		console.error('AXIOS - GET ERROR:', error);
		throw error;
	}
}

export async function postData(endpoint, data) {
	try {
		const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
		return response.data;
	} catch (error) {
		console.error('AXIOS - POST ERROR: ', error);
		throw error;
	}
}

export async function putData(endpoint, data) {
	try {
		const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
		return response.data;
	} catch (error) {
		console.error('AXIOS - PUT ERROR:', error);
		throw error;
	}
}

export async function deleteData(endpoint) {
	try {
		const response = await axios.delete(`${BASE_URL}/${endpoint}`);
		return response.data;
	} catch (error) {
		console.error('AXIOS - DELETE ERROR: ', error);
		throw error;
	}
}
