import { friends } from '../../../stores/userStore'
import { getFriendsBack } from '../../../infrastructure/httpClient/user'

export const getFriends = async () => {
	const receivedFriends = await getFriendsBack()
	friends.set(receivedFriends)
}
