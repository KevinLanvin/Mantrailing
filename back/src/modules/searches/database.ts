import { SearchCreation, searchesTable } from '../../database/schemas/searches'

import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { dogsTable } from '../../database/schemas/dogs'
import { eq } from 'drizzle-orm'
import { trailsTable } from '../../database/schemas/trails'
import { usersTable } from '../../database/schemas/users'

export class SearchesTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async create(search: SearchCreation) {
		return this.client.insert(searchesTable).values(search).returning()
	}

	async setDog(searchId: string, dogId: string) {
		return this.client
			.update(searchesTable)
			.set({ dogId })
			.where(eq(searchesTable.id, searchId))
	}

	async setRunner(searchId: string, runnerId: string) {
		return this.client
			.update(searchesTable)
			.set({ runnerId })
			.where(eq(searchesTable.id, searchId))
	}

	async setPreparedTrail(searchId: string, preparedTrailId: string) {
		return this.client
			.update(searchesTable)
			.set({ preparedTrailId })
			.where(eq(searchesTable.id, searchId))
	}

	async setRunnerTrail(searchId: string, runnerTrailId: string) {
		return this.client
			.update(searchesTable)
			.set({ runnerTrailId })
			.where(eq(searchesTable.id, searchId))
	}

	async setDogTrail(searchId: string, dogTrailId: string) {
		return this.client
			.update(searchesTable)
			.set({ dogTrailId })
			.where(eq(searchesTable.id, searchId))
	}

	async get(searchId: string) {
		return this.client
			.select()
			.from(searchesTable)
			.where(eq(searchesTable.id, searchId))
			.innerJoin(dogsTable, eq(dogsTable.id, searchesTable.dogId))
			.innerJoin(usersTable, eq(usersTable.id, searchesTable.runnerId))
			.innerJoin(trailsTable, eq(trailsTable.id, searchesTable.preparedTrailId))
			.innerJoin(trailsTable, eq(trailsTable.id, searchesTable.runnerTrailId))
			.innerJoin(trailsTable, eq(trailsTable.id, searchesTable.dogTrailId))
	}

	async getDogSearches(dogId: string) {
		return this.client
			.select()
			.from(searchesTable)
			.where(eq(searchesTable.dogId, dogId))
			.innerJoin(dogsTable, eq(dogsTable.id, searchesTable.dogId))
			.innerJoin(usersTable, eq(usersTable.id, searchesTable.runnerId))
			.innerJoin(trailsTable, eq(trailsTable.id, searchesTable.preparedTrailId))
			.innerJoin(trailsTable, eq(trailsTable.id, searchesTable.runnerTrailId))
			.innerJoin(trailsTable, eq(trailsTable.id, searchesTable.dogTrailId))
	}

	async delete(searchId: string) {
		return this.client
			.delete(searchesTable)
			.where(eq(searchesTable.id, searchId))
	}
}
