import { getUser, loginBack } from '../../infrastructure/httpClient/login'
import { token, user } from '../../stores/loginStore'

import { UnauthorizedError } from '../errors/Unauthorized'
import { goto } from '$app/navigation'

export const login = async (username: string, password: string) => {
	try {
		const receivedToken = await loginBack(username, password)
		token.set(receivedToken)
		const receivedUser = await getUser()
		user.set(receivedUser)
		window.localStorage.setItem('token', receivedToken)
		window.localStorage.setItem('user', JSON.stringify(receivedUser))
		goto('/')
	} catch (error) {
		console.error(error)
	}
}

export const getUserInfo = async () => {
	try {
		const receivedUser = await getUser()
		user.set(receivedUser)
		window.localStorage.setItem('user', JSON.stringify(receivedUser))
	} catch (error) {
		console.log(error)
		if (typeof error === UnauthorizedError.name) {
			console.log('Invalid token')
			goto('/login')
		}
	}
}

export const disconnect = () => {
	token.set('')
	user.set(null)
	localStorage.clear()
	goto('/login')
}
