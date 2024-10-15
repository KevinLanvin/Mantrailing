import { FriendshipsTable } from './database'
import { UsersTable } from '../users/database'

export const confirmInvitation = async (
	{
		friendshipDbClient,
	}: {
		userDbClient: UsersTable
		friendshipDbClient: FriendshipsTable
	},
	{ userId, friendId }: { userId: string; friendId: string },
) => {
	await friendshipDbClient.confirm(friendId, userId)
}
