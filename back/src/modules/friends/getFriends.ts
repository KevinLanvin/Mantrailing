import { FriendshipsTable } from './database'

export const getFriends = async (
	{ friendshipDbClient }: { friendshipDbClient: FriendshipsTable },
	{ userId }: { userId: string },
) => {
	return await friendshipDbClient.getFriends(userId)
}
