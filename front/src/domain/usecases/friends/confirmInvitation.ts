import { confirmInvitationBack } from '../../../infrastructure/httpClient/user'
import { getFriends } from './getFriends'
import { getReceivedInvitations } from './getReceivedInvitations'

export const confirmInvitation = async (friendId: string) => {
	await confirmInvitationBack(friendId)
	getReceivedInvitations()
	getFriends()
}
