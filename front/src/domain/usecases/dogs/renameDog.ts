import { getDogsBack, renameDogBack } from '../../../infrastructure/httpClient/dog'

import { dogs } from '../../../stores/dogStore'

export const renameDog = async (dogId: string, name: string) => {
	await renameDogBack(dogId, name)
	dogs.set(await getDogsBack())
}
