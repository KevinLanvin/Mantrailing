import {
	Coordinate,
	TrailCreation,
	trailsTable,
} from '../../database/schemas/trails'

import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'

export class TrailsTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async create(trail: TrailCreation) {
		return this.client.insert(trailsTable).values(trail).returning()
	}

	async delete(trailId: string) {
		return this.client.delete(trailsTable).where(eq(trailsTable.id, trailId))
	}

	async updatePath(trailId: string, path: Coordinate[]) {
		return this.client
			.update(trailsTable)
			.set({ path })
			.where(eq(trailsTable.id, trailId))
	}

	async get(trailId: string) {
		return this.client
			.select()
			.from(trailsTable)
			.where(eq(trailsTable.id, trailId))
	}
}
