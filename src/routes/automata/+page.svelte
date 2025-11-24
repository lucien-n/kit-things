<script lang="ts">
	import { Button } from '&/ui/button';
	import { onMount } from 'svelte';
	import { Automata } from './automata.svelte';

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let automata = $state<Automata | null>(null);

	onMount(() => {
		if (!canvasEl) throw new Error('Could not find canvas element');

		automata = new Automata(canvasEl);
		automata.run();
	});
</script>

<div class="absolute left-3 top-3">
	<Button onclick={() => automata?.pause()}>{automata?.isPaused ? 'Play' : 'Pause'}</Button>
</div>

<canvas bind:this={canvasEl}></canvas>
