import { PUBLIC_API_URL } from '$env/static/public'
import axios from 'axios'
import { disconnect } from '../../domain/usecases/login'
import { get } from 'svelte/store'
import { token } from '../../stores/loginStore'

export const httpClientBack = axios.create({
	baseURL: PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

httpClientBack.interceptors.request.use((config) => {
	const currentToken = get(token)
	if (currentToken) {
		config.headers.setAuthorization(`Bearer ${get(token)}`)
	}
	return config
})

httpClientBack.interceptors.response.use((response) => {
	if (response.status === 403 || response.status === 401) {
		disconnect()
	}
	return response
})
