import { WebSocketMessage } from './websocketMessages'

export class WebSocketHandler {
	static #instance: WebSocketHandler
	private sockets: Record<string, unknown>
	private constructor() {
		this.sockets = {}
	}
	public static getInstance(): WebSocketHandler {
		if (!WebSocketHandler.#instance) {
			WebSocketHandler.#instance = new WebSocketHandler()
		}
		return WebSocketHandler.#instance
	}

	public setWebSocket(userId: string, ws: unknown) {
		this.sockets[userId] = ws
	}

	public closeWebSocket(userId: string) {
		delete this.sockets[userId]
	}

	public sendMessage(userId: string, message: WebSocketMessage) {
		const webSocket = this.sockets[userId] as WebSocket
		if (webSocket) {
			webSocket.send(message)
		}
	}
}
