import { CannotFindUser } from '../../errors/errors'
import { CannotInviteYourselfError } from '../../errors/errors'
import { FriendshipsTable } from './database'
import { UsersTable } from '../users/database'
import { WebSocketHandler } from '../websocket/WebSocketHandler'
import { WebSocketMessage } from '../websocket/websocketMessages'

export const sendFriendInvitation = async (
	{
		userDbClient,
		friendshipDbClient,
		webSocketHandler,
	}: {
		userDbClient: UsersTable
		friendshipDbClient: FriendshipsTable
		webSocketHandler: WebSocketHandler
	},
	{ sender, invited }: { sender: string; invited: string },
) => {
	const invitedUser =
		(await userDbClient.getById(invited)) ??
		(await userDbClient.getByUsername(invited))
	if (!invitedUser) {
		throw new CannotFindUser(invited)
	}
	if (sender === invitedUser.id) {
		throw new CannotInviteYourselfError(sender)
	}
	webSocketHandler.sendMessage(
		invited,
		WebSocketMessage.REFRESH_RECEIVED_FRIENDS_INVITATIONS,
	)
	return await friendshipDbClient.create({
		sender,
		invited: invitedUser.id,
	})
}
