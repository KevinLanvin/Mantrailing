import { pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { searchesTable } from './searches'
import { usersTable } from './users'

export const dogsTable = pgTable('dogs', {
	id: text('id').primaryKey().$defaultFn(createId),
	name: text('name').notNull(),
	humanId: text('humanId')
		.notNull()
		.references(() => usersTable.id),
})

export const dogsRelations = relations(dogsTable, ({ one, many }) => ({
	human: one(usersTable, {
		fields: [dogsTable.humanId],
		references: [usersTable.id],
	}),
	searches: many(searchesTable),
}))

export type DogEntity = typeof dogsTable.$inferSelect
export type DogCreation = typeof dogsTable.$inferInsert
