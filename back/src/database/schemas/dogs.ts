import { pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

export const dogsTable = pgTable('dogs', {
	id: text('id').primaryKey().$defaultFn(createId),
	name: text('name').notNull(),
	humanId: text('humanId').notNull(),
})

export type DogEntity = typeof dogsTable.$inferSelect
export type DogCreation = typeof dogsTable.$inferInsert
