import Elysia from 'elysia'
import { User } from '../../database/schemas/users'
import { bearer } from '@elysiajs/bearer'
import { jwtMiddleware } from './jwt'

export const authorization = (message: string) => {
	const plugin = new Elysia()
		.use(jwtMiddleware)
		.use(bearer())
		.derive(async ({ jwt, cookie: { auth }, set, bearer }) => {
			const user = await jwt.verify(auth.value ?? bearer)
			if (!user) {
				set.status = 403
				throw new Error(message)
			}
			return { user }
		})
		.as('plugin')
	return plugin
}
