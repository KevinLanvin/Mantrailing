import { pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'
import { dogsTable } from './dogs'
import { friendshipsTable } from './friends'
import { relations } from 'drizzle-orm'
import { sessionParticipationsTable } from './sessionParticipations'
import { sessionsTable } from './sessions'

export const usersTable = pgTable('users', {
	id: text('id').primaryKey().$defaultFn(createId),
	username: text('username').unique().notNull(),
	password: text('password').notNull(),
	email: text('email').unique().notNull(),
	authorizationKey: text('authorizationKey'),
})

export const usersRelations = relations(usersTable, ({ many }) => ({
	friends: many(friendshipsTable),
	dogs: many(dogsTable),
	sessions: many(sessionsTable),
	sessionParticipations: many(sessionParticipationsTable),
}))

export type UserEntity = typeof usersTable.$inferSelect
export type User = Omit<UserEntity, 'password' | 'authorizationKey'>
export type UserCreation = typeof usersTable.$inferInsert
