import { getReceivedInvitationsBack } from '../../../infrastructure/user'
import { receivedInvitations } from '../../../stores/userStore'

export const getReceivedInvitations = async () => {
	receivedInvitations.set(await getReceivedInvitationsBack())
}
