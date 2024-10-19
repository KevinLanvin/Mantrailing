import type { Dog } from '../domain/entities/Dog'
import { writable } from 'svelte/store'

export const dogs = writable<Dog[]>([])
