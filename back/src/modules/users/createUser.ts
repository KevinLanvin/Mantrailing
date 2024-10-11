import { UsersTable } from './database'

export const createUser = async (
	{ userDbClient }: { userDbClient: UsersTable },
	{
		username,
		password,
		email,
	}: { username: string; password: string; email: string },
) => {
	return await userDbClient.create({
		username,
		email,
		password: await Bun.password.hash(password),
	})
}
