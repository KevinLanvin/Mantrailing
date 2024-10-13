import { FriendshipInvitationsTable } from './friendshipDatabase'

export const getSentInvitations = async (
	{
		friendshipInvitationDbClient,
	}: { friendshipInvitationDbClient: FriendshipInvitationsTable },
	{ userId }: { userId: string },
) => {
	return await friendshipInvitationDbClient.getSentInvitations(userId)
}
