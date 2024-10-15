import { FriendshipsTable } from './database'

export const cancelInvitation = async (
	{
		friendshipDbClient,
	}: {
		friendshipDbClient: FriendshipsTable
	},
	{ userId, friendId }: { userId: string; friendId: string },
) => {
	await friendshipDbClient.cancelInvitation(friendId, userId)
}
