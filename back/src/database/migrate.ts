import { db } from '../libs/database'
import { migrate } from 'drizzle-orm/neon-http/migrator'

const main = async () => {
	try {
		await migrate(db, { migrationsFolder: 'drizzle' })
		console.log('Migration completed')
	} catch (error) {
		console.error('Error during migration:', error)
		process.exit(1)
	}
}

main()
