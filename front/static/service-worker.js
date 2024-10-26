const CACHE_NAME = 'offline-cache'
const urlsToCache = ['/']

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache)
		})
	)
})
