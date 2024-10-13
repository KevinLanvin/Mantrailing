<script lang="ts">
	import { onMount } from 'svelte'
	import { getFriends } from '../../domain/usecases/friends/getFriends'
	import { friends, pendingInvitations, receivedInvitations } from '../../stores/userStore'
	import { sendFriendInvitationTo } from '../../domain/usecases/friends/sendFriendInvitation'
	import { getPendingInvitations } from '../../domain/usecases/friends/getPendingInvitations'
	import { getReceivedInvitations } from '../../domain/usecases/friends/getReceivedInvitations'

	onMount(() => {
		getFriends()
		getPendingInvitations()
		getReceivedInvitations()
	})

	let friendId: string
	const sendFriendInvitation = () => {
		sendFriendInvitationTo(friendId)
		friendId = ''
	}
</script>

<h3>Friends</h3>
{$friends.length}
<ul>
	{#each $friends as friend}
		<li>{friend}</li>
	{/each}
</ul>
<h3>Ajouter un ami</h3>
<form action="" on:submit={sendFriendInvitation}>
	<input type="text" name="friendId" id="friendId" bind:value={friendId} />
	<button type="submit">Ajouter un ami</button>
</form>
<h3>Demandes en attente</h3>
<ul>
	{#each $pendingInvitations as invitation}
		<li>
			{invitation.username}
		</li>
	{/each}
</ul>
<h3>Demandes reçues</h3>
<ul>
	{#each $receivedInvitations as invitation}
		<li>{invitation.username}</li>
	{/each}
</ul>
