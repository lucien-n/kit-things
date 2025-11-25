<script lang="ts">
	import { onMount } from 'svelte';
	import { Toolbar } from './(components)/toolbar';
	import { Automata } from './automata.svelte';

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let automata = $state<Automata | null>(null);

	onMount(() => {
		if (!canvasEl) throw new Error('Could not find canvas element');

		automata = new Automata(canvasEl);
		automata.run();
	});
</script>

{#if automata}
	<Toolbar {automata} />
{/if}

<canvas bind:this={canvasEl}></canvas>
