import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'

import { createId } from '@paralleldrive/cuid2'
import { friendshipInvitationsTable } from './friendInvitations'

export const usersTable = pgTable('users', {
	id: text('id').primaryKey().$defaultFn(createId),
	username: text('username').unique().notNull(),
	password: text('password').notNull(),
	email: text('email').unique().notNull(),
	authorizationKey: text('authorizationKey'),
	friends: text('friends')
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
})

export const usersRelations = relations(usersTable, ({ many }) => ({
	sentFriendshipInvitations: many(friendshipInvitationsTable, {
		relationName: 'sentFriendshipInvitations',
	}),
	pendingFriendshipInvitations: many(friendshipInvitationsTable, {
		relationName: 'pendingFriendshipInvitations',
	}),
}))

export type UserEntity = typeof usersTable.$inferSelect
export type User = Omit<UserEntity, 'password' | 'authorizationKey'>
export type UserCreation = typeof usersTable.$inferInsert
