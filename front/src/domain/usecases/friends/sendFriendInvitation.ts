import { getPendingInvitations } from './getPendingInvitations'
import { sendFriendInvitationBack } from '../../../infrastructure/user'

export const sendFriendInvitationTo = async (friendId: string) => {
	await sendFriendInvitationBack(friendId)
	getPendingInvitations()
}
