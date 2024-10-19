import { DogsTable } from './database'

export const getUserDogs = (
	{ dogsDbClient }: { dogsDbClient: DogsTable },
	{ humanId }: { humanId: string },
) => {
	return dogsDbClient.getDogsByHuman(humanId)
}
