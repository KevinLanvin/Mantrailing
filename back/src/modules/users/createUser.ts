import { CannotCreateUser } from '../../errors/errors'
import { UsersTable } from './database'

export const createUser = async (
	{ userDbClient }: { userDbClient: UsersTable },
	{
		username,
		password,
		email,
	}: { username: string; password: string; email: string },
) => {
	try {
		return await userDbClient.create({
			username,
			email,
			password: await Bun.password.hash(password),
		})
	} catch (error) {
		throw new CannotCreateUser('Cet utilisateur existe déjà')
	}
}
