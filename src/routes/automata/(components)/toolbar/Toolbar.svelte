<script lang="ts">
	import type { Automata } from '../../automata.svelte';
	import { PauseButton } from '../pause-button';
	import { SimulationSpeedSelector } from '../simulation-speed-selector';

	interface Props {
		automata: Automata;
	}
	const { automata }: Props = $props();
</script>

<div class="absolute top-3 left-3 flex gap-2">
	<PauseButton isPaused={automata?.isPaused ?? true} onclick={() => automata?.togglePause()} />

	<SimulationSpeedSelector
		onSelectedSpeedModifier={(newFactor) => {
			if (!automata) return;
			automata.simulationSpeedFactor = newFactor;
		}}
	/>
</div>
