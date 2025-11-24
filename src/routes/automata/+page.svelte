<script lang="ts">
	import { Button } from '&/ui/button';
	import * as Tooltip from '&/ui/tooltip';
	import { PauseIcon, PlayIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { SimulationSpeedSelector } from './(components)/simulation-speed-selector';
	import { Automata } from './automata.svelte';

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let automata = $state<Automata | null>(null);

	onMount(() => {
		if (!canvasEl) throw new Error('Could not find canvas element');

		automata = new Automata(canvasEl);
		automata.run();
	});
</script>

<div class="absolute top-3 left-3 flex gap-2">
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button onclick={() => automata?.togglePause()} size="icon" class="cursor-pointer">
				{#if automata?.isPaused}
					<PlayIcon />
				{:else}
					<PauseIcon />
				{/if}
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content side="bottom">
			{automata?.isPaused ? 'Play simulation' : 'Pause simulation'}
		</Tooltip.Content>
	</Tooltip.Root>

	<SimulationSpeedSelector
		onSelectedSpeedModifier={(newFactor) => {
			if (!automata) return;

			automata.simulationSpeedFactor = newFactor;
		}}
	/>
</div>

<canvas bind:this={canvasEl}></canvas>
