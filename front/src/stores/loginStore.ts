import type { AuthenticatedUser } from '../domain/entities/AuthenticatedUser'
import { writable } from 'svelte/store'

export const token = writable<string>()

export const user = writable<AuthenticatedUser>()
