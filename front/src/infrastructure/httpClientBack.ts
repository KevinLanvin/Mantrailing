import { PUBLIC_API_URL } from '$env/static/public'
import axios from 'axios'
import { get } from 'svelte/store'
import { token } from '../stores/loginStore'

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
