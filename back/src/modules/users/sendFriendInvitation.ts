import {
	CannotInviteYourselfError,
	InvitationAlreadyExists,
} from '../../errors/errors'

import { CannotFindUser } from './../../errors/errors'
import { FriendshipInvitationsTable } from './friendshipDatabase'
import { UsersTable } from './database'

export const sendFriendInvitation = async (
	{
		userDbClient,
		friendshipInvitationDbClient,
	}: {
		userDbClient: UsersTable
		friendshipInvitationDbClient: FriendshipInvitationsTable
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
	if (await friendshipInvitationDbClient.exists(sender, invitedUser.id)) {
		throw new InvitationAlreadyExists(sender, invitedUser.id)
	}
	return await friendshipInvitationDbClient.create({
		sender,
		invited: invitedUser.id,
	})
}
