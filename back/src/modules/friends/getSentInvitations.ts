import { FriendshipsTable } from './database'

export const getSentInvitations = async (
	{ friendshipDbClient }: { friendshipDbClient: FriendshipsTable },
	{ userId }: { userId: string },
) => {
	return await friendshipDbClient.getSentInvitations(userId)
}
