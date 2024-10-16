import { getPendingInvitations } from './getPendingInvitations'
import { sendFriendInvitationBack } from '../../../infrastructure/httpClient/user'

export const sendFriendInvitationTo = async (friendId: string) => {
	await sendFriendInvitationBack(friendId)
	getPendingInvitations()
}
