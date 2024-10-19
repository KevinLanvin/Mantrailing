import { DogsTable } from './database'

export const renameDog = async (
	{ dogsDbClient }: { dogsDbClient: DogsTable },
	{
		humanId,
		dogId,
		newName,
	}: { humanId: string; dogId: string; newName: string },
) => {
	await dogsDbClient.updateName(humanId, dogId, newName)
}
