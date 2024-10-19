import { deleteDogBack, getDogsBack } from '../../../infrastructure/httpClient/dog'

import { dogs } from '../../../stores/dogStore'

export const deleteDog = async (dogId: string) => {
	await deleteDogBack(dogId)
	dogs.set(await getDogsBack())
}
