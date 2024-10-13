import type { Friend } from '../domain/entities/Friend'
import { writable } from 'svelte/store'

export const friends = writable<Friend[]>([])

export const pendingInvitations = writable<Friend[]>([])

export const receivedInvitations = writable<Friend[]>([])
