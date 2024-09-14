<script>
	import { distance } from '../stores/pathStore'
	import { score } from '../stores/scoreStore'
</script>

<svg width="0" height="0">
	<defs>
		<clipPath id="scoreClip" clipPathUnits="objectBoundingBox">
			<path d="M0 0 h1 C0.8 0.6 0.4 1 0 1 V0" />
		</clipPath>
		<clipPath id="distanceClip" clipPathUnits="objectBoundingBox">
			<path d="M 1 0 H 0 C 0.2 0.6 0.6 1 1 1 V 0" />
		</clipPath>
	</defs>
</svg>
<header>
	<div class="headerspan score">{$score}</div>
	<div class="headerspan distance">{$distance}m</div>
</header>

<style lang="scss">
	header {
		position: fixed;
		top: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.headerspan {
		background-color: #eee;
		padding: 1rem;
		width: calc(45% - 5rem);
		text-align: center;
		position: relative;
	}

	.score::before {
		content: '';
		position: absolute;
		left: 100%;
		top: 0;
		width: 3rem;
		height: 100%;
		background-color: #eee;
		clip-path: url('#scoreClip');
	}

	.distance::before {
		content: '';
		position: absolute;
		right: 100%;
		top: 0;
		width: 3rem;
		height: 100%;
		background-color: #eee;
		clip-path: url('#distanceClip');
	}
</style>
