import { date, pgTable, text } from 'drizzle-orm/pg-core'

import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'

export const sessionsTable = pgTable('sessions', {
	id: text('id').primaryKey().$defaultFn(createId),
	date: date('date'),
	users: text('users')
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	searches: text('searches')
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
})
