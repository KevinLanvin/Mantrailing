import { FriendshipsTable } from './database'

export const deleteFriend = async (
	{ friendshipDbClient }: { friendshipDbClient: FriendshipsTable },
	{ userId, friendId }: { userId: string; friendId: string },
) => {
	await friendshipDbClient.delete(userId, friendId)
}
