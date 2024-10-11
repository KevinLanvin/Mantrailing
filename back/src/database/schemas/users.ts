import { pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'

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

export type UserEntity = typeof usersTable.$inferSelect
export type User = Omit<UserEntity, 'password' | 'authorizationKey'>
export type UserCreation = typeof usersTable.$inferInsert
