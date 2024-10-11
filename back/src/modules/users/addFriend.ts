import { UsersTable } from './database'

export const addFriend = async (
	{ userDbClient }: { userDbClient: UsersTable },
	{ userId, friendId }: { userId: string; friendId: string },
) => {
	try {
		const friend = await userDbClient.getById(friendId)
		if (!friend) {
			throw new Error(`Cannot find user with id ${friendId}`)
		}
		await userDbClient.addFriend(userId, friendId)
		await userDbClient.addFriend(friendId, userId)
	} catch (error) {
		throw new Error(
			`Error while adding friend ${friendId} to user ${userId}. Cause: ${error}.`,
		)
	}
}
