export enum errorCode {
	CANNOT_INVITE_YOURSELF = 'CANNOT_INVITE_YOURSELF',
	INVITATION_ALREADY_EXISTS = 'INVITATION_ALREADY_EXISTS',
	CANNOT_FIND_USER = 'CANNOT_FIND_USER',
}

export class CannotInviteYourselfError extends Error {
	constructor(userId: string) {
		super(`${userId} cannot invite himself`)
	}
}

export class InvitationAlreadyExists extends Error {
	constructor(sender: string, invited: string) {
		super(`Invitation between ${sender} and ${invited} already exists`)
	}
}

export class CannotFindUser extends Error {
	constructor(user: string) {
		super(`Cannot find user ${user}`)
	}
}
