import {
	FriendshipInvitationCreation,
	friendshipInvitationsTable,
} from '../../database/schemas/friendInvitations'
import { eq, sql } from 'drizzle-orm'

import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { usersTable } from '../../database/schemas/users'

export class FriendshipInvitationsTable {
	constructor(private readonly client: NeonHttpDatabase) {}

	async create(friendshipInvitation: FriendshipInvitationCreation) {
		return await this.client
			.insert(friendshipInvitationsTable)
			.values(friendshipInvitation)
			.returning()
	}

	async getSentInvitations(userId: string) {
		return await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
			})
			.from(friendshipInvitationsTable)
			.where(eq(friendshipInvitationsTable.sender, userId))
			.innerJoin(
				usersTable,
				eq(usersTable.id, friendshipInvitationsTable.invited),
			)
	}

	async getReceivedInvitations(userId: string) {
		return await this.client
			.select({
				id: usersTable.id,
				username: usersTable.username,
			})
			.from(friendshipInvitationsTable)
			.where(eq(friendshipInvitationsTable.invited, userId))
			.innerJoin(
				usersTable,
				eq(usersTable.id, friendshipInvitationsTable.sender),
			)
	}

	async cancelInvitation(sender: string, invited: string) {
		return await this.client
			.delete(friendshipInvitationsTable)
			.where(
				sql`${friendshipInvitationsTable.sender}  = ${sender} and ${friendshipInvitationsTable.invited} = ${invited}`,
			)
	}

	async exists(idA: string, idB: string) {
		const invitations = await this.client
			.select()
			.from(friendshipInvitationsTable)
			.where(
				sql`(${friendshipInvitationsTable.sender} = ${idA} and ${friendshipInvitationsTable.invited} = ${idB}) or (${friendshipInvitationsTable.sender} = ${idB} and ${friendshipInvitationsTable.invited} = ${idA})`,
			)
		return invitations.length > 0
	}
}
