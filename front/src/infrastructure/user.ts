import type { Friend } from '../domain/entities/Friend'
import { httpClientBack } from './httpClientBack'

export const getFriendsBack = async (): Promise<string[]> => {
	return (await httpClientBack.get('/users/me')).data.user.friends
}

export const sendFriendInvitationBack = async (friendId: string): Promise<void> => {
	await httpClientBack.post('/users/friend', { friendId })
}

export const getPendingInvitationsBack = async (): Promise<Friend[]> => {
	return (await httpClientBack.get('/users/friends/sentInvitations')).data
}

export const getReceivedInvitationsBack = async (): Promise<Friend[]> => {
	return (await httpClientBack.get('/users/friends/receivedInvitations')).data
}
