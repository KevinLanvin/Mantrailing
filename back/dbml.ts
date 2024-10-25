import * as dogSchema from './src/database/schemas/dogs'
import * as friendSchema from './src/database/schemas/friends'
import * as searchSchema from './src/database/schemas/searches'
import * as sessionParticipationSchema from './src/database/schemas/sessionParticipations'
import * as sessionSchema from './src/database/schemas/sessions'
import * as trailsSchema from './src/database/schemas/trails'
import * as usersSchema from './src/database/schemas/users'

import { pgGenerate } from 'drizzle-dbml-generator' // Using Postgres for this example

const out = './schema.dbml'
const relational = true

const globalSchema = {
	...dogSchema,
	...friendSchema,
	...searchSchema,
	...sessionParticipationSchema,
	...sessionSchema,
	...trailsSchema,
	...usersSchema,
}

pgGenerate({ schema: globalSchema, out, relational })
