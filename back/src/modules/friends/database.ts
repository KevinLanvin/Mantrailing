import {
	FriendshipCreation,
	friendshipsTable,
} from '../../database/schemas/friends'
import { and, eq, or } from 'drizzle-orm'

import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { usersTable } from '../../database/schemas/users'

export class FriendshipsTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async create(friendshipInvitation: FriendshipCreation) {
		return await this.client
			.insert(friendshipsTable)
			.values(friendshipInvitation)
			.returning()
	}

	async getSentInvitations(userId: string) {
		return await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
			})
			.from(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.sender, userId),
					eq(friendshipsTable.confirmed, false),
				),
			)
			.innerJoin(usersTable, eq(usersTable.id, friendshipsTable.invited))
	}

	async getReceivedInvitations(userId: string) {
		return await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
			})
			.from(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.invited, userId),
					eq(friendshipsTable.confirmed, false),
				),
			)
			.innerJoin(usersTable, eq(usersTable.id, friendshipsTable.sender))
	}

	async cancelInvitation(sender: string, invited: string) {
		return await this.client
			.delete(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.sender, sender),
					eq(friendshipsTable.invited, invited),
					eq(friendshipsTable.confirmed, false),
				),
			)
	}

	async delete(idA: string, idB: string) {
		await this.client
			.delete(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.confirmed, true),
					or(
						and(
							eq(friendshipsTable.sender, idA),
							eq(friendshipsTable.invited, idB),
						),
						and(
							eq(friendshipsTable.sender, idB),
							eq(friendshipsTable.invited, idA),
						),
					),
				),
			)
	}

	async exists(idA: string, idB: string) {
		const invitations = await this.client
			.select()
			.from(friendshipsTable)
			.where(
				or(
					and(
						eq(friendshipsTable.sender, idA),
						eq(friendshipsTable.invited, idB),
					),
					and(
						eq(friendshipsTable.sender, idB),
						eq(friendshipsTable.invited, idA),
					),
				),
			)
		return invitations.length > 0
	}

	async confirm(sender: string, invited: string) {
		await this.client
			.update(friendshipsTable)
			.set({ confirmed: true })
			.where(
				and(
					eq(friendshipsTable.sender, sender),
					eq(friendshipsTable.invited, invited),
				),
			)
	}

	async getFriends(user: string) {
		const invitedFriends = await this.client
			.select({ id: usersTable.id, username: usersTable.username })
			.from(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.confirmed, true),
					eq(friendshipsTable.sender, user),
				),
			)
			.innerJoin(usersTable, eq(usersTable.id, friendshipsTable.invited))
		const invitingFriends = await this.client
			.select({ id: usersTable.id, username: usersTable.username })
			.from(friendshipsTable)
			.where(
				and(
					eq(friendshipsTable.confirmed, true),
					eq(friendshipsTable.invited, user),
				),
			)
			.innerJoin(usersTable, eq(usersTable.id, friendshipsTable.sender))
		return [...invitedFriends, ...invitingFriends]
	}
}
