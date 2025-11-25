<script lang="ts">
	import type { Automata } from '../../automata';
	import { AutomataRuleSelect } from '../automata-rule-select';
	import { PauseButton } from '../pause-button';
	import { SimulationSpeedSelector } from '../simulation-speed-selector';

	interface Props {
		automata: Automata;
	}
	const { automata }: Props = $props();
</script>

<div class="absolute top-3 left-3 flex gap-2">
	<PauseButton
		isPaused={automata?.state.isPaused ?? true}
		onclick={() => automata?.togglePause()}
	/>

	<SimulationSpeedSelector bind:selectedModifier={automata.state.simulationSpeedModifier} />

	<AutomataRuleSelect bind:rule={automata.state.rule} />
</div>
