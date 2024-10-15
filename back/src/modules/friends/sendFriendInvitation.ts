import { CannotFindUser } from '../../errors/errors'
import { CannotInviteYourselfError } from '../../errors/errors'
import { FriendshipsTable } from './database'
import { UsersTable } from '../users/database'

export const sendFriendInvitation = async (
	{
		userDbClient,
		friendshipDbClient,
	}: {
		userDbClient: UsersTable
		friendshipDbClient: FriendshipsTable
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
	return await friendshipDbClient.create({
		sender,
		invited: invitedUser.id,
	})
}
