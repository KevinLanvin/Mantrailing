import { FriendshipInvitationsTable } from './friendshipDatabase'

export const getReceivedInvitations = async (
	{
		friendshipInvitationDbClient,
	}: { friendshipInvitationDbClient: FriendshipInvitationsTable },
	{ userId }: { userId: string },
) => {
	return await friendshipInvitationDbClient.getReceivedInvitations(userId)
}
