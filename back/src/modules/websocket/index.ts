import Elysia from 'elysia'
import { WebSocketHandler } from './WebSocketHandler'
import { jwtMiddleware } from '../../libs/handlers/jwt'

const socketHandler = WebSocketHandler.getInstance()

export const webSocketModule = new Elysia().use(jwtMiddleware).ws('/ws', {
	async open(ws) {
		const userToken = ws.data.headers['sec-websocket-protocol']
		if (!userToken) {
			ws.terminate()
			throw new Error('No token given')
		}
		const user = await ws.data.jwt.verify(userToken)
		if (!user) {
			ws.terminate()
			throw new Error('Invalid token')
		}
		socketHandler.setWebSocket(user.id as string, ws)
	},
})
