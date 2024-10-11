import Elysia, { NotFoundError, t } from 'elysia'

import { UsersTable } from '../users/database'
import { addDays } from 'date-fns'
import { authorization } from '../../libs/handlers/authorization'
import { db } from '../../libs/database'
import { jwtMiddleware } from '../../libs/handlers/jwt'
import { logger } from '@bogeychan/elysia-logger'

export const authModule = new Elysia({ prefix: '/auth' })
	.use(jwtMiddleware)
	.use(logger())
	// .use(emailSender)
	.decorate({ userDbClient: new UsersTable(db) })
	.post(
		'',
		async ({ jwt, body, set, cookie: { auth }, userDbClient }) => {
			const user = await userDbClient.getAuthUser({ ...body })
			if (!user) {
				set.status = 404
				throw new NotFoundError('User not found')
			}
			auth.set({
				value: await jwt.sign(user),
				expires: addDays(new Date(), 7),
				secure: false,
				httpOnly: false,
				sameSite: false,
			})
			return auth.value
		},
		{
			body: t.Object({
				username: t.String(),
				password: t.String(),
			}),
		},
	)
	.get(
		'/i-forgot',
		async ({ query, userDbClient, log }) => {
			const userExist = await userDbClient.exist(query.email)
			if (!userExist) {
				return
			}

			const user = await userDbClient.getByEmail(query.email)
			if (!user) {
				return
			}
		},
		{
			query: t.Object({
				email: t.String(),
			}),
		},
	)
	.use(authorization('You need to connect to check your auth'))
	.get('', ({ user }) => {
		return user
	})
