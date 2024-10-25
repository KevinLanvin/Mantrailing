import { pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'
import { dogsTable } from './dogs'
import { relations } from 'drizzle-orm'
import { sessionsTable } from './sessions'
import { trailsTable } from './trails'
import { usersTable } from './users'

export const searchesTable = pgTable('searches', {
	id: text('id').primaryKey().$defaultFn(createId),
	dogId: text('dogId').references(() => dogsTable.id),
	runnerId: text('runnerId').references(() => usersTable.id),
	preparedTrailId: text('preparedTrailId').references(() => trailsTable.id),
	runnerTrailId: text('runnerTrailId').references(() => trailsTable.id),
	dogTrailId: text('dogTrailId').references(() => trailsTable.id),
	sessionId: text('sessionId').references(() => sessionsTable.id),
})

export const searchesRelations = relations(searchesTable, ({ one }) => ({
	dog: one(dogsTable, {
		fields: [searchesTable.dogId],
		references: [dogsTable.id],
	}),
	runner: one(usersTable, {
		fields: [searchesTable.runnerId],
		references: [usersTable.id],
	}),
	preparedTrail: one(trailsTable, {
		fields: [searchesTable.preparedTrailId],
		references: [trailsTable.id],
		relationName: 'preparedTrail',
	}),
	runnerTrail: one(trailsTable, {
		fields: [searchesTable.runnerTrailId],
		references: [trailsTable.id],
		relationName: 'runnerTrail',
	}),
	dogTrail: one(trailsTable, {
		fields: [searchesTable.dogTrailId],
		references: [trailsTable.id],
		relationName: 'dogTrail',
	}),
	session: one(sessionsTable, {
		fields: [searchesTable.sessionId],
		references: [sessionsTable.id],
	}),
}))

export type SearchEntity = typeof searchesTable.$inferSelect
export type SearchCreation = typeof searchesTable.$inferInsert
