import { FriendshipsTable } from './database'

export const getReceivedInvitations = async (
	{ friendshipDbClient }: { friendshipDbClient: FriendshipsTable },
	{ userId }: { userId: string },
) => {
	return await friendshipDbClient.getReceivedInvitations(userId)
}
