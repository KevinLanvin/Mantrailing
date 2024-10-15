<script lang="ts">
	import { onMount } from 'svelte'
	import { getFriends } from '../../domain/usecases/friends/getFriends'
	import { friends, pendingInvitations, receivedInvitations } from '../../stores/userStore'
	import { sendFriendInvitationTo } from '../../domain/usecases/friends/sendFriendInvitation'
	import { getPendingInvitations } from '../../domain/usecases/friends/getPendingInvitations'
	import { getReceivedInvitations } from '../../domain/usecases/friends/getReceivedInvitations'
	import { confirmInvitation } from '../../domain/usecases/friends/confirmInvitation'
	import { cancelInvitation } from '../../domain/usecases/friends/cancelInvitation'
	import { deleteFriend } from '../../domain/usecases/friends/deleteFriend'

	onMount(() => {
		getFriends()
		getPendingInvitations()
		getReceivedInvitations()
	})

	let searchedFriend: string
	const sendFriendInvitation = () => {
		sendFriendInvitationTo(searchedFriend)
		searchedFriend = ''
	}

	const handleConfirmInvitation = (friendId: string) => {
		confirmInvitation(friendId)
	}

	const handleCancelInvitation = (friendId: string) => {
		cancelInvitation(friendId)
	}

	const handleDeleteFriend = (friendId: string) => {
		deleteFriend(friendId)
	}
</script>

<h3>Friends</h3>
<ul>
	{#each $friends as friend}
		<li>
			{friend.username} <button on:click={() => handleDeleteFriend(friend.id)}>Supprimer</button>
		</li>
	{/each}
</ul>
<h3>Ajouter un ami</h3>
<form action="" on:submit={sendFriendInvitation}>
	<input type="text" name="friendId" id="friendId" bind:value={searchedFriend} />
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
		<li>
			{invitation.username}
			<button on:click={() => handleConfirmInvitation(invitation.id)}>Accepter</button><button
				on:click={() => handleCancelInvitation(invitation.id)}>Refuser</button
			>
		</li>
	{/each}
</ul>
