<script lang="ts">
	import { onMount } from 'svelte'
	import { getFriends } from '../../../domain/usecases/friends/getFriends'
	import { friends, pendingInvitations, receivedInvitations } from '../../../stores/userStore'
	import { sendFriendInvitationTo } from '../../../domain/usecases/friends/sendFriendInvitation'
	import { getPendingInvitations } from '../../../domain/usecases/friends/getPendingInvitations'
	import { getReceivedInvitations } from '../../../domain/usecases/friends/getReceivedInvitations'
	import { confirmInvitation } from '../../../domain/usecases/friends/confirmInvitation'
	import { cancelInvitation } from '../../../domain/usecases/friends/cancelInvitation'
	import { deleteFriend } from '../../../domain/usecases/friends/deleteFriend'
	import { getDogs } from '../../../domain/usecases/dogs/getDogs'
	import { dogs } from '../../../stores/dogStore'
	import { deleteDog } from '../../../domain/usecases/dogs/deleteDog'
	import { createDog } from '../../../domain/usecases/dogs/createDog'

	onMount(() => {
		getFriends()
		getPendingInvitations()
		getReceivedInvitations()
		getDogs()
	})

	let searchedFriend: string
	let dogName: string
	const sendFriendInvitation = () => {
		sendFriendInvitationTo(searchedFriend)
		searchedFriend = ''
	}

	const handleNewDogSubmit = () => {
		createDog(dogName)
		dogName = ''
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

	const handleDeleteDog = (dogId: string) => {
		deleteDog(dogId)
	}
</script>

<h3>Amis</h3>
<ul>
	{#each $friends as friend}
		<li>
			{friend.username} <button on:click={() => handleDeleteFriend(friend.id)}>Supprimer</button>
		</li>
	{/each}
</ul>
<h4>Ajouter un ami</h4>
<form action="" on:submit={sendFriendInvitation}>
	<input type="text" name="friendId" id="friendId" bind:value={searchedFriend} />
	<button type="submit">Ajouter un ami</button>
</form>
<h4>Demandes en attente</h4>
<ul>
	{#each $pendingInvitations as invitation}
		<li>
			{invitation.username}
		</li>
	{/each}
</ul>
<h4>Demandes reçues</h4>
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
<h3>Chiens</h3>
<ul>
	{#each $dogs as dog}
		<li>{dog.name} <button on:click={() => handleDeleteDog(dog.id)}>Supprimer</button></li>
	{/each}
</ul>
<h4>Ajouter un chien</h4>
<form action="" on:submit={handleNewDogSubmit}>
	<input type="text" name="dogName" bind:value={dogName} />
	<button type="submit">Ajouter un chien</button>
</form>
