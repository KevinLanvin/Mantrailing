import { FriendshipInvitationsTable, UsersTable } from './database'

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
	try {
		const invitedUser = await userDbClient.getById(invited)
		if (!invitedUser) {
			throw new Error(`Cannot find user with id ${invited}`)
		}
		return await friendshipInvitationDbClient.create({ sender, invited })
	} catch (error) {
		throw new Error(
			`Error while sending friend invitation from ${sender} to user ${invited}. Cause: ${error}.`,
		)
	}
}
