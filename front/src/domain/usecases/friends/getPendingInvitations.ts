import { getPendingInvitationsBack } from '../../../infrastructure/httpClient/user'
import { pendingInvitations } from '../../../stores/userStore'

export const getPendingInvitations = async () => {
	const receivedInvitations = await getPendingInvitationsBack()
	pendingInvitations.set(receivedInvitations)
}
