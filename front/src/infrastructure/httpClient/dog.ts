import type { Dog } from '../../domain/entities/Dog'
import { httpClientBack } from './httpClientBack'

export const getDogsBack = async (): Promise<Dog[]> => {
	return (await httpClientBack.get('/dogs')).data
}

export const createDogBack = async (dogName: string): Promise<void> => {
	await httpClientBack.post('/dogs', { dogName })
}

export const renameDogBack = async (dogId: string, name: string): Promise<void> => {
	await httpClientBack.patch(`/dogs/${dogId}`, { name })
}

export const deleteDogBack = async (dogId: string): Promise<void> => {
	await httpClientBack.delete(`/dogs/${dogId}`)
}
