<script lang="ts">
	import { onMount } from 'svelte'
	import { token, user } from '../stores/loginStore'
	import { goto } from '$app/navigation'
	import { publicRoutes } from '$lib/publicRoutes'
	import { getUser } from '../infrastructure/login'

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/service-worker.js')
				.then((registration) => {
					console.log('Service Worker registered with scope:', registration.scope)
					registration.pushManager.getSubscription()
				})
				.catch((error) => {
					console.error('Service Worker registration failed:', error)
				})
		}

		// Retrieve from local storage
		const currentPage = window.location.pathname
		const localStorageUser = localStorage.getItem('user')
		const localStorageToken = localStorage.getItem('token')
		if (!$user && localStorageUser) {
			user.set(JSON.parse(localStorageUser))
		}
		if (!$token && localStorageToken) {
			token.set(localStorageToken)
		}

		if (!publicRoutes.includes(currentPage) && !$user) {
			if (!$token) {
				goto('/login')
			} else {
				getUser()
			}
		}
	})
</script>

<slot />

<style lang="scss">
</style>
