import { Elysia } from 'elysia'
import { authModule } from './modules/auth'
import cors from '@elysiajs/cors'
import { dogsModule } from './modules/dogs'
import { errorModule } from './modules/error'
import { friendsModule } from './modules/friends'
import { jwtMiddleware } from './libs/handlers/jwt'
import swagger from '@elysiajs/swagger'
import { usersModule } from './modules/users'
import { webSocketModule } from './modules/websocket'

const app = new Elysia()
	.get('', 'Hello')
	.use(swagger())
	.use(cors())
	.use(errorModule)
	.use(jwtMiddleware)
	.use(authModule)
	.use(webSocketModule)
	.use(usersModule)
	.use(friendsModule)
	.use(dogsModule)
	.listen(process.env.PORT!)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
