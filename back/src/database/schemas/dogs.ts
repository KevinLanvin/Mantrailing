import { pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { usersTable } from './users'

export const dogsTable = pgTable('dogs', {
	id: text('id').primaryKey().$defaultFn(createId),
	name: text('name').notNull(),
	humanId: text('humanId').notNull(),
})

export const dogsRelations = relations(dogsTable, ({ one }) => ({
	human: one(usersTable, {
		fields: [dogsTable.humanId],
		references: [usersTable.id],
	}),
}))

export type DogEntity = typeof dogsTable.$inferSelect
export type DogCreation = typeof dogsTable.$inferInsert
