import Elysia from 'elysia'
import { SearchesTable } from './database'
import { authorization } from '../../libs/handlers/authorization'
import { db } from '../../libs/database'
import { logger } from '@bogeychan/elysia-logger'

export const searchesModule = new Elysia({ prefix: '/searches' })
	.use(logger())
	.use(authorization('You need to login to access this route'))
	.decorate({
		searchesDbClient: new SearchesTable(db),
	})
