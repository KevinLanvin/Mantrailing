import { type Readable, type Subscriber, derived } from 'svelte/store'

import { onDestroy } from 'svelte'

export function watch<T>(deps: Readable<T>, fn: Subscriber<T>) {
	const unsubscribe = derived(deps, (values) => values).subscribe(fn)
	onDestroy(unsubscribe)
}
