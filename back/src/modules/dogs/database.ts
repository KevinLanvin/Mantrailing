import { DogCreation, dogsTable } from '../../database/schemas/dogs'
import { and, eq } from 'drizzle-orm'

import { NeonHttpDatabase } from 'drizzle-orm/neon-http'

export class DogsTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async create(dog: DogCreation) {
		return this.client.insert(dogsTable).values(dog).returning()
	}

	async updateName(humanId: string, dogId: string, newName: string) {
		return this.client
			.update(dogsTable)
			.set({ name: newName })
			.where(and(eq(dogsTable.id, dogId), eq(dogsTable.humanId, humanId)))
	}

	async getDogsByHuman(humanId: string) {
		return this.client
			.select()
			.from(dogsTable)
			.where(eq(dogsTable.humanId, humanId))
	}

	async delete(humanId: string, dogId: string) {
		return this.client
			.delete(dogsTable)
			.where(and(eq(dogsTable.humanId, humanId), eq(dogsTable.id, dogId)))
	}
}
