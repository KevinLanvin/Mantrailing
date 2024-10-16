import { cancelInvitationBack } from '../../../infrastructure/httpClient/user'
import { getReceivedInvitations } from './getReceivedInvitations'

export const cancelInvitation = async (friendId: string) => {
	await cancelInvitationBack(friendId)
	getReceivedInvitations()
}
