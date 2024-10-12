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
				})
				.catch((error) => {
					console.error('Service Worker registration failed:', error)
				})
		}

		const currentPage = window.location.pathname
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
