import Elysia, { t } from 'elysia'

import { DogsTable } from './database'
import { authorization } from '../../libs/handlers/authorization'
import { createDog } from './createDog'
import { db } from '../../libs/database'
import { deleteDog } from './deleteDog'
import { getUserDogs } from './getUserDogs'
import { logger } from '@bogeychan/elysia-logger'
import { renameDog } from './renameDog'

export const dogsModule = new Elysia({ prefix: '/dogs' })
	.use(logger())
	.use(authorization('You need to login to access this route'))
	.decorate({
		dogsDbClient: new DogsTable(db),
	})
	.get('', ({ user, dogsDbClient }) => {
		return getUserDogs({ dogsDbClient }, { humanId: user.id as string })
	})
	.post(
		'',
		({ user, dogsDbClient, body: { dogName } }) => {
			return createDog(
				{ dogsDbClient },
				{ humanId: user.id as string, name: dogName },
			)
		},
		{
			body: t.Object({
				dogName: t.String(),
			}),
		},
	)
	.patch(
		'/:dogId',
		({ user, dogsDbClient, body: { name }, params: { dogId } }) => {
			return renameDog(
				{ dogsDbClient },
				{ humanId: user.id as string, dogId, newName: name },
			)
		},
		{
			body: t.Object({
				name: t.String(),
			}),
		},
	)
	.delete('/:dogId', ({ user, dogsDbClient, params: { dogId } }) => {
		return deleteDog({ dogsDbClient }, { humanId: user.id as string, dogId })
	})
