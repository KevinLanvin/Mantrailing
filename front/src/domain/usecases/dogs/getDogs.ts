import { dogs } from '../../../stores/dogStore'
import { getDogsBack } from '../../../infrastructure/httpClient/dog'

export const getDogs = async () => {
	dogs.set(await getDogsBack())
}
