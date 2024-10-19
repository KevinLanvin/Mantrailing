import { DogsTable } from './database'

export const createDog = async (
	{ dogsDbClient }: { dogsDbClient: DogsTable },
	{ humanId, name }: { humanId: string; name: string },
) => {
	await dogsDbClient.create({ humanId, name })
}
