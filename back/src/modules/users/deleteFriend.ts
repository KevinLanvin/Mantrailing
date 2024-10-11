import { UsersTable } from './database'

export const deleteFriend = async (
	{ userDbClient }: { userDbClient: UsersTable },
	{ userId, friendId }: { userId: string; friendId: string },
) => {
	try {
		await userDbClient.deleteFriend(userId, friendId)
		await userDbClient.deleteFriend(friendId, userId)
	} catch (error) {
		throw new Error(
			`Error while deleting friend ${friendId} from user ${userId}. Cause: ${error}`,
		)
	}
}
