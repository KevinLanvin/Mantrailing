import { getPendingInvitationsBack } from '../../../infrastructure/user'
import { pendingInvitations } from '../../../stores/userStore'

export const getPendingInvitations = async () => {
	const receivedInvitations = await getPendingInvitationsBack()
	pendingInvitations.set(receivedInvitations)
}
