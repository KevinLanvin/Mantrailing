import { getReceivedInvitationsBack } from '../../../infrastructure/httpClient/user'
import { receivedInvitations } from '../../../stores/userStore'

export const getReceivedInvitations = async () => {
	receivedInvitations.set(await getReceivedInvitationsBack())
}
