export type Friend = {
	id: string
	username: string
}

export type Invitation = {
	sender: Friend
	invited: Friend
}
