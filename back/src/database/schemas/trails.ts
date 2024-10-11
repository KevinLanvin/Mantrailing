import { json, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'

export const trailsTable = pgTable('trails', {
	id: text('id').primaryKey().$defaultFn(createId),
	path: json('path')
		.notNull()
		.$type<Coordinate[]>()
		.$defaultFn(() => []),
	startTimestamp: timestamp('startTimestamp', {
		withTimezone: true,
		mode: 'date',
	}),
	endTimestamp: timestamp('endTimestamp', { withTimezone: true, mode: 'date' }),
})

export type Coordinate = {
	latitude: number
	longitude: number
}

export type TrailEntity = typeof trailsTable.$inferSelect
export type TrailCreation = typeof trailsTable.$inferInsert
