<script lang="ts">
	import { onMount } from 'svelte'
	import { token, user } from '../../stores/loginStore'
	import { goto } from '$app/navigation'
	import { publicRoutes } from '$lib/publicRoutes'
	import { getUser } from '../../infrastructure/httpClient/login'
	import { openWebSocket } from '../../infrastructure/webSockets'
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		registerServiceWorker()
		loadLocalStorage()
		login()
		openWebSocket()
	})

	const registerServiceWorker = () => {
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
	}

	const loadLocalStorage = () => {
		const localStorageUser = localStorage.getItem('user')
		const localStorageToken = localStorage.getItem('token')
		if (!$user && localStorageUser) {
			user.set(JSON.parse(localStorageUser))
		}
		if (!$token && localStorageToken) {
			token.set(localStorageToken)
		}
	}

	const login = () => {
		const currentPage = window.location.pathname
		if (!publicRoutes.includes(currentPage) && !$user) {
			if (!$token) {
				goto('/login')
			} else {
				getUser()
			}
		}
	}
</script>

{@render children?.()}

<style lang="scss">
	@import "../../assets/styles/main.scss";
</style>
