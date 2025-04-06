import Elysia, { error } from 'elysia'

import { bearer } from '@elysiajs/bearer'
import { jwtMiddleware } from './jwt'

export const authorization = (message: string) => {
	const plugin = new Elysia()
		.use(jwtMiddleware)
		.use(bearer())
		.derive(async ({ jwt, cookie: { auth }, set, bearer }) => {
			const user = await jwt.verify(auth.value ?? bearer)
			if (!user) {
				return error(401, 'Unauthorized')
			}
			return { user }
		})
		.as('plugin')
	return plugin
}
