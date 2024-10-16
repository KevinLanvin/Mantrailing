import { PUBLIC_API_URL } from '$env/static/public'
import { WebSocketMessage } from './websocketMessages'
import { get } from 'svelte/store'
import { getReceivedInvitations } from '../../domain/usecases/friends/getReceivedInvitations'
import { token } from '../../stores/loginStore'

export const openWebSocket = () => {
	const accessToken = get(token)
	if (accessToken) {
		const webSocket = new WebSocket(`${PUBLIC_API_URL}/ws`, [accessToken])
		webSocket.onopen = () => {
			console.log('WebSocket opened')
		}
		webSocket.onmessage = (messageEvent) => {
			messageHandlers[messageEvent.data as WebSocketMessage]()
		}
	}
}

const messageHandlers: Record<WebSocketMessage, CallableFunction> = {
	[WebSocketMessage.REFRESH_RECEIVED_FRIENDS_INVITATIONS]: getReceivedInvitations
}
