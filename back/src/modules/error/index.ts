import {
	CannotFindInvitation,
	CannotFindUser,
	CannotInviteYourselfError,
	InvitationAlreadyExists,
	errorCode,
} from '../../errors/errors'

import Elysia from 'elysia'

export const errorModule = new Elysia()
	.error(errorCode.CANNOT_INVITE_YOURSELF, CannotInviteYourselfError)
	.error(errorCode.INVITATION_ALREADY_EXISTS, InvitationAlreadyExists)
	.error(errorCode.CANNOT_FIND_INVITATION, CannotFindInvitation)
	.error(errorCode.CANNOT_FIND_USER, CannotFindUser)
	.onError(({ code, error, set }) => {
		switch (code) {
			case errorCode.CANNOT_INVITE_YOURSELF:
				set.status = 'Bad Request'
				return error.message
			case errorCode.INVITATION_ALREADY_EXISTS:
				set.status = 'Bad Request'
				return error.message
			case errorCode.CANNOT_FIND_INVITATION:
				set.status = 'Not Found'
				return error.message
			case errorCode.CANNOT_FIND_USER:
				set.status = 'Not Found'
				return error.message
		}
	})
