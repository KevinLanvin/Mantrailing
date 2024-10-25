import { boolean, pgTable, primaryKey, text } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'
import { usersTable } from './users'

export const friendshipsTable = pgTable(
	'friendships',
	{
		sender: text('senderId')
			.notNull()
			.references(() => usersTable.id),
		invited: text('invitedId')
			.notNull()
			.references(() => usersTable.id),
		confirmed: boolean('confirmed').$default(() => false),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.sender, table.invited] }),
	}),
)

export const friendshipsRelations = relations(friendshipsTable, ({ one }) => ({
	sender: one(usersTable, {
		fields: [friendshipsTable.sender],
		references: [usersTable.id],
		relationName: 'sender',
	}),
	invited: one(usersTable, {
		fields: [friendshipsTable.invited],
		references: [usersTable.id],
		relationName: 'invited',
	}),
}))

export type FriendshipEntity = typeof friendshipsTable.$inferSelect
export type FriendshipCreation = typeof friendshipsTable.$inferInsert
