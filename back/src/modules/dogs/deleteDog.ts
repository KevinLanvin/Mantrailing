import { DogsTable } from './database'

export const deleteDog = async (
	{ dogsDbClient }: { dogsDbClient: DogsTable },
	{ humanId, dogId }: { humanId: string; dogId: string },
) => {
	await dogsDbClient.delete(humanId, dogId)
}
