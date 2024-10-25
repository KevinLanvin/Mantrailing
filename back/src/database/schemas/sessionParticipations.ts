import { boolean, pgTable, primaryKey, text } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'
import { sessionsTable } from './sessions'
import { usersTable } from './users'

export const sessionParticipationsTable = pgTable(
	'sessionParticipations',
	{
		user: text('userId')
			.notNull()
			.references(() => usersTable.id),
		session: text('sessionId')
			.notNull()
			.references(() => sessionsTable.id),
		confirmed: boolean('confirmed').$default(() => false),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.user, table.session] }),
	}),
)

export const sessionParticipationsRelations = relations(
	sessionParticipationsTable,
	({ one }) => ({
		user: one(usersTable, {
			fields: [sessionParticipationsTable.user],
			references: [usersTable.id],
		}),
		session: one(sessionsTable, {
			fields: [sessionParticipationsTable.session],
			references: [sessionsTable.id],
		}),
	}),
)

export type SessionParticipationEntity =
	typeof sessionParticipationsTable.$inferSelect
export type SessionParticipationCreation =
	typeof sessionParticipationsTable.$inferInsert
