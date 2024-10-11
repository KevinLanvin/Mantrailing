import { Elysia } from 'elysia'
import { authModule } from './modules/auth'
import { jwtMiddleware } from './libs/handlers/jwt'
import swagger from '@elysiajs/swagger'
import { usersModule } from './modules/users'

const app = new Elysia()
	.get('', 'Hello')
	.use(swagger())
	.use(jwtMiddleware)
	.use(authModule)
	.use(usersModule)
	.listen(process.env.PORT!)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
