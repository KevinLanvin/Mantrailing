import type { Friend } from '../../domain/entities/Friend'
import { httpClientBack } from './httpClientBack'

export const getFriendsBack = async (): Promise<Friend[]> => {
	return (await httpClientBack.get('/friends')).data
}

export const sendFriendInvitationBack = async (friendId: string): Promise<void> => {
	await httpClientBack.post('/friends', { friendId })
}

export const getPendingInvitationsBack = async (): Promise<Friend[]> => {
	return (await httpClientBack.get('/friends/sentInvitations')).data
}

export const getReceivedInvitationsBack = async (): Promise<Friend[]> => {
	return (await httpClientBack.get('/friends/receivedInvitations')).data
}

export const confirmInvitationBack = async (friendId: string): Promise<void> => {
	await httpClientBack.post('/friends/confirm', { friendId })
}

export const cancelInvitationBack = async (friendId: string): Promise<void> => {
	await httpClientBack.delete(`/friends/invitation/${friendId}`)
}

export const deleteFriendBack = async (friendId: string): Promise<void> => {
	await httpClientBack.delete(`/friends/${friendId}`)
}

export const signupBack = async (
	username: string,
	email: string,
	password: string
): Promise<void> => {
	return httpClientBack.post('users', {
		username,
		email,
		password
	})
}
