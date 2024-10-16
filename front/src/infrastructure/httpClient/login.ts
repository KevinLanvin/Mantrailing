import type { AuthenticatedUser } from '../../domain/entities/AuthenticatedUser'
import { httpClientBack } from './httpClientBack'

export const loginBack = async (username: string, password: string): Promise<string> => {
	return (await httpClientBack.post('auth', { username, password })).data as string
}

export const getUser = async (): Promise<AuthenticatedUser> => {
	return (await httpClientBack.get('auth')).data as AuthenticatedUser
}
