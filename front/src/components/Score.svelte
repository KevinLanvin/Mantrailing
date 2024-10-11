<script>
	import { distance } from '../stores/pathStore'
	import { score } from '../stores/scoreStore'
</script>

<header>
	<div class="headerspan">
		<span class="headerIcon">
			<iconify-icon icon="material-symbols-light:speed-rounded"></iconify-icon>
		</span>
		<span>
			{$score}
		</span>
	</div>
	<div class="headerspan">
		<span class="headerIcon">
			<iconify-icon icon="material-symbols-light:footprint"></iconify-icon>
		</span>
		<span>
			{$distance}<span class="small">m</span>
		</span>
	</div>
</header>

<style lang="scss">
	header {
		position: fixed;
		top: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: start;
		font-size: 2rem;
		box-shadow: 2px 2px 2px #aaa;
		padding: 1rem 1.5rem;
		background-color: #eee;
		border-bottom-right-radius: 2rem;
	}

	.headerspan {
		display: flex;
		gap: 1rem;
	}

	.headerIcon {
		display: flex;
		align-items: center;
	}

	.small {
		font-size: 0.8rem;
	}
</style>
