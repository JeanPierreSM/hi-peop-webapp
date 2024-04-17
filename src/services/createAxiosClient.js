import axios from 'axios';

export function createAxiosClient({ options, getCurrentAccessToken, logout }) {
	const client = axios.create(options);

	client.interceptors.request.use(
		(config) => {
			if (!config.notTokenNeeded) {
				const token = getCurrentAccessToken();
				if (token) {
					config.headers.Authorization = 'Bearer ' + token;
				}
			}

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	client.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalRequest = error.config;
			if (error.response && error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				await logout();
			}
			return Promise.reject(error);
		}
	);

	return client;
}
