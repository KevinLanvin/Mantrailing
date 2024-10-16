import { deleteFriendBack } from '../../../infrastructure/httpClient/user'
import { getFriends } from './getFriends'

export const deleteFriend = async (friendId: string) => {
	await deleteFriendBack(friendId)
	getFriends()
}
