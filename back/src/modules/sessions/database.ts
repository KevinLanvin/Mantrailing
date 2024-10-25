import { SessionCreation, sessionsTable } from '../../database/schemas/sessions'

import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'
import { searchesTable } from '../../database/schemas/searches'
import { sessionParticipationsTable } from '../../database/schemas/sessionParticipations'

export class SessionsTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async create(session: SessionCreation) {
		return this.client.insert(sessionsTable).values(session).returning()
	}

	async getByUser(userId: string) {
		return this.client
			.select()
			.from(sessionsTable)
			.where(eq(sessionsTable.createdBy, userId))
			.innerJoin(
				sessionParticipationsTable,
				eq(sessionParticipationsTable.session, sessionsTable.id),
			)
			.innerJoin(searchesTable, eq(searchesTable.id, sessionsTable.id))
	}

	async get(sessionId: string) {
		return this.client
			.select()
			.from(sessionsTable)
			.where(eq(sessionsTable.id, sessionId))
			.innerJoin(
				sessionParticipationsTable,
				eq(sessionParticipationsTable.session, sessionsTable.id),
			)
			.innerJoin(searchesTable, eq(searchesTable.id, sessionsTable.id))
	}
}
