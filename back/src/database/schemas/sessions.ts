import { date, pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { searchesTable } from './searches'
import { sessionParticipationsTable } from './sessionParticipations'
import { usersTable } from './users'

export const sessionsTable = pgTable('sessions', {
	id: text('id').primaryKey().$defaultFn(createId),
	date: date('date').notNull(),
	createdBy: text('createdBy').references(() => usersTable.id),
})

export const sessionsRelations = relations(sessionsTable, ({ many, one }) => ({
	participants: many(sessionParticipationsTable),
	searches: many(searchesTable),
	createdBy: one(usersTable, {
		fields: [sessionsTable.createdBy],
		references: [usersTable.id],
	}),
}))

export type SessionEntity = typeof sessionsTable.$inferSelect
export type SessionCreation = typeof sessionsTable.$inferInsert
