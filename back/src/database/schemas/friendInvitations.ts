import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'
import { usersTable } from './users'

export const friendshipInvitationsTable = pgTable(
	'friendshipInvitations',
	{
		sender: text('senderId')
			.notNull()
			.references(() => usersTable.id),
		invited: text('invitedId')
			.notNull()
			.references(() => usersTable.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.sender, table.invited] }),
	}),
)

export const friendshipInvitationsRelations = relations(
	friendshipInvitationsTable,
	({ one }) => ({
		sender: one(usersTable, {
			fields: [friendshipInvitationsTable.sender],
			references: [usersTable.id],
		}),
		invited: one(usersTable, {
			fields: [friendshipInvitationsTable.invited],
			references: [usersTable.id],
		}),
	}),
)

export type FriendshipInvitationsEntity =
	typeof friendshipInvitationsTable.$inferSelect
export type FriendshipInvitationCreation =
	typeof friendshipInvitationsTable.$inferInsert
