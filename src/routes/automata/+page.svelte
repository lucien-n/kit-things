<script lang="ts">
	import { onMount } from 'svelte';
	import { Toolbar } from './(components)/toolbar';
	import { Automata } from './automata';

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

	<div class="absolute top-3 right-3">
		<div class="grid grid-cols-2 gap-3">
			{#each Object.entries(automata.state.debug) as [id, text] (id)}
				<strong>{id}</strong>
				<p>{text}</p>
			{/each}
		</div>
	</div>
{/if}

<canvas bind:this={canvasEl}></canvas>
