import Elysia, { t } from 'elysia'

import { FriendshipsTable } from '../friends/database'
import { UsersTable } from './database'
import { authorization } from '../../libs/handlers/authorization'
import { createUser } from './createUser'
import { db } from '../../libs/database'
import { logger } from '@bogeychan/elysia-logger'

export const usersModule = new Elysia({ prefix: '/users' })
	.use(logger())
	// .use(emailSender)
	.decorate({
		userDbClient: new UsersTable(db),
		friendshipDbClient: new FriendshipsTable(db),
	})
	.get('', async ({ userDbClient }) => {
		return userDbClient.getAll()
	})
	.post(
		'',
		async ({ log, userDbClient, body, set }) => {
			try {
				log.info('Create user')
				createUser({ userDbClient }, body)
				set.status = 201
			} catch (error) {
				log.error(error)
				set.status = 409
				throw new Error('An error occured while create your account', {
					cause: error.message,
				})
			}
		},
		{
			body: t.Object({
				username: t.String(),
				password: t.String(),
				email: t.String(),
			}),
		},
	)
	.use(authorization('You need to login to access this route'))
	.get('/me', async ({ user, userDbClient }) => {
		const selectedUser = await userDbClient.getById(user.id as string)
		return { user: selectedUser }
	})
	.get('/:userId', async ({ params: { userId }, userDbClient }) => {
		const selectedUser = await userDbClient.getById(userId)
		return { user: selectedUser }
	})
	.patch(
		'/update-password',
		({ user, userDbClient, body: { oldPassword, newPassword } }) =>
			userDbClient.changePassword({
				userId: user.id as string,
				oldPassword,
				newPassword,
			}),
		{
			body: t.Object({
				oldPassword: t.String(),
				newPassword: t.String(),
			}),
		},
	)
