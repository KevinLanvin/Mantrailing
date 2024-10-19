import { createDogBack, getDogsBack } from '../../../infrastructure/httpClient/dog'

import { dogs } from '../../../stores/dogStore'

export const createDog = async (dogName: string) => {
	await createDogBack(dogName)
	dogs.set(await getDogsBack())
}
