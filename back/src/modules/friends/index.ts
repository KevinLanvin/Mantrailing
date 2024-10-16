import Elysia, { t } from 'elysia'

import { FriendshipsTable } from './database'
import { UsersTable } from '../users/database'
import { WebSocketHandler } from '../websocket/WebSocketHandler'
import { authorization } from '../../libs/handlers/authorization'
import { cancelInvitation } from './cancelInvitation'
import { confirmInvitation } from './confirmInvitation'
import { db } from '../../libs/database'
import { deleteFriend } from './deleteFriend'
import { getFriends } from './getFriends'
import { getReceivedInvitations } from './getReceivedInvitations'
import { getSentInvitations } from './getSentInvitations'
import { logger } from '@bogeychan/elysia-logger'
import { sendFriendInvitation } from './sendFriendInvitation'

export const friendsModule = new Elysia({ prefix: '/friends' })
	.use(logger())
	.use(authorization('You need to login to access this route'))
	.decorate({
		userDbClient: new UsersTable(db),
		friendshipDbClient: new FriendshipsTable(db),
		webSocketHandler: WebSocketHandler.getInstance(),
	})
	.get('', ({ user, friendshipDbClient }) => {
		return getFriends({ friendshipDbClient }, { userId: user.id as string })
	})
	.post(
		'',
		({
			user,
			userDbClient,
			friendshipDbClient,
			webSocketHandler,
			body: { friendId },
		}) => {
			return sendFriendInvitation(
				{ userDbClient, friendshipDbClient, webSocketHandler },
				{ sender: user.id as string, invited: friendId },
			)
		},
		{
			body: t.Object({
				friendId: t.String(),
			}),
		},
	)
	.post(
		'/confirm',
		({ user, userDbClient, friendshipDbClient, body: { friendId } }) => {
			return confirmInvitation(
				{ userDbClient, friendshipDbClient },
				{ userId: user.id as string, friendId },
			)
		},
		{
			body: t.Object({
				friendId: t.String(),
			}),
		},
	)
	.delete(
		'/invitation/:friendId',
		({ user, friendshipDbClient, params: { friendId } }) => {
			return cancelInvitation(
				{ friendshipDbClient },
				{ userId: user.id as string, friendId },
			)
		},
	)
	.delete(
		'/:friendId',
		({ user, friendshipDbClient, params: { friendId } }) => {
			return deleteFriend(
				{ friendshipDbClient },
				{ userId: user.id as string, friendId },
			)
		},
	)
	.get('/sentInvitations', ({ user, friendshipDbClient }) => {
		return getSentInvitations(
			{ friendshipDbClient },
			{ userId: user.id as string },
		)
	})
	.get('/receivedInvitations', ({ user, friendshipDbClient }) => {
		return getReceivedInvitations(
			{ friendshipDbClient },
			{ userId: user.id as string },
		)
	})
