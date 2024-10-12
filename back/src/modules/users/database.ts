import {
	FriendshipInvitationCreation,
	friendshipInvitationsTable,
} from './../../database/schemas/friendInvitations'
import { User, UserCreation, usersTable } from '../../database/schemas/users'
import { and, count, eq, or } from 'drizzle-orm'

import { NeonHttpDatabase } from 'drizzle-orm/neon-http'

export type GetOptions = {
	populate: {
		civilizations: boolean
	}
}

export class FriendshipInvitationsTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async create(friendshipInvitation: FriendshipInvitationCreation) {
		return await this.client
			.insert(friendshipInvitationsTable)
			.values(friendshipInvitation)
			.returning()
	}
}

export class UsersTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async getAll(): Promise<User[]> {
		const users = await this.client.select().from(usersTable)

		return users
	}

	async create(user: UserCreation) {
		const [createdUser] = await this.client
			.insert(usersTable)
			.values(user)
			.returning()
		this.addAuthorizationKey(createdUser.id)
	}

	async getAuthUser({
		username,
		password,
	}: {
		username: string
		password: string
	}) {
		const [retrievedUser] = await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
				password: usersTable.password,
			})
			.from(usersTable)
			.where(
				or(eq(usersTable.username, username), eq(usersTable.email, username)),
			)

		if (!retrievedUser) {
			return null
		}

		const isPasswordValid = await Bun.password.verify(
			password,
			retrievedUser.password,
		)
		if (!isPasswordValid) {
			return null
		}

		const { password: _, ...user } = retrievedUser
		return user
	}

	async getById(id: string): Promise<User | null> {
		const [user] = await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
				authorizationKey: usersTable.authorizationKey,
				friends: usersTable.friends,
			})
			.from(usersTable)
			.where(eq(usersTable.id, id))

		return user
	}

	async getByEmail(email: string): Promise<User | null> {
		const [user] = await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
				authorizationKey: usersTable.authorizationKey,
				friends: usersTable.friends,
			})
			.from(usersTable)
			.where(eq(usersTable.email, email))

		if (!user) {
			return null
		}

		return user
	}

	async resetPassword({
		userId,
		password,
		authorizationKey,
	}: {
		userId: string
		password: string
		authorizationKey: string
	}) {
		const newPassword = await Bun.password.hash(password)
		const [foundUser] = await this.client
			.select({
				id: usersTable.id,
			})
			.from(usersTable)
			.where(
				and(
					eq(usersTable.id, userId),
					eq(usersTable.authorizationKey, authorizationKey),
				),
			)

		if (!foundUser) {
			throw new Error('No user found with this informations')
		}

		await this.client
			.update(usersTable)
			.set({ password: newPassword })
			.where(
				and(
					eq(usersTable.id, userId),
					eq(usersTable.authorizationKey, authorizationKey),
				),
			)

		await this.addAuthorizationKey(userId)
	}

	async addAuthorizationKey(userId: string) {
		const [user] = await this.client
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, userId))

		const hasher = new Bun.CryptoHasher('blake2b256')

		const rawKey = `${user.id}${user.password}${user.email}`
		const authorizationKey = hasher.update(rawKey, 'base64')
		await this.client
			.update(usersTable)
			.set({
				authorizationKey: authorizationKey.digest('hex'),
			})
			.where(eq(usersTable.id, user.id))
	}

	async addAuthorizationKeys() {
		const users = await this.client.select().from(usersTable)

		for (const user of users) {
			this.addAuthorizationKey(user.id)
		}
	}

	async exist(emailOrUsername: string): Promise<boolean> {
		const [{ value }] = await this.client
			.select({ value: count(usersTable.id) })
			.from(usersTable)
			.where(
				or(
					eq(usersTable.username, emailOrUsername),
					eq(usersTable.email, emailOrUsername),
				),
			)

		return value !== 0
	}

	async changePassword({
		userId,
		oldPassword,
		newPassword,
	}: {
		userId: string
		oldPassword: string
		newPassword: string
	}) {
		const [retrievedUser] = await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
				password: usersTable.password,
			})
			.from(usersTable)
			.where(eq(usersTable.id, userId))

		if (!retrievedUser) {
			return null
		}

		const isPasswordValid = await Bun.password.verify(
			oldPassword,
			retrievedUser.password,
		)
		if (!isPasswordValid) {
			throw new Error('Your password does not match')
		}

		await this.client
			.update(usersTable)
			.set({ password: newPassword })
			.where(eq(usersTable.id, userId))

		await this.addAuthorizationKey(userId)
	}

	async addFriend(userId: string, friendId: string) {
		const [{ friends }] = await this.client
			.select({ friends: usersTable.friends })
			.from(usersTable)
			.where(eq(usersTable.id, userId))
		const friendIndex = friends.indexOf(friendId)
		if (friendIndex !== -1) {
			throw new Error('Users are already friends')
		}
		friends.push(friendId)
		await this.client
			.update(usersTable)
			.set({ friends })
			.where(eq(usersTable.id, userId))
	}

	async deleteFriend(userId: string, friendId: string) {
		const [{ friends }] = await this.client
			.select({ friends: usersTable.friends })
			.from(usersTable)
			.where(eq(usersTable.id, userId))
		const friendIndex = friends.indexOf(friendId)
		if (friendIndex === -1) {
			throw new Error('Friend index not found')
		}
		friends.splice(friendIndex, 1)
		await this.client
			.update(usersTable)
			.set({ friends })
			.where(eq(usersTable.id, userId))
	}
}
