import { pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

export const searchesTable = pgTable('searches', {
	id: text('id').primaryKey().$defaultFn(createId),
	dogId: text('dogId'),
	preparedTrailId: text('preparedTrailid'),
	runnerTrailId: text('runnerTrailId'),
	dogTrailId: text('dogTrailId'),
})

export type SearchEntity = typeof searchesTable.$inferSelect
export type SearchCreation = typeof searchesTable.$inferInsert
