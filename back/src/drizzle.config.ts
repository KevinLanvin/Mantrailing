import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './db/schema/**/*.ts',
	out: './drizzle',
	dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
	verbose: true,
	migrations: {
		table: 'migrations_custom', // default `__drizzle_migrations`,
	},
	strict: true,
})
