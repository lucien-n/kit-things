<script lang="ts">
	import { Checkbox } from '&/ui/checkbox';
	import { Label } from '&/ui/label';
	import type { Automata } from '../../automata';
	import { AutomataRuleSelect } from '../automata-rule-select';
	import { PauseButton } from '../pause-button';
	import { SimulationSpeedSelector } from '../simulation-speed-selector';

	interface Props {
		automata: Automata;
	}
	const { automata }: Props = $props();
</script>

<div class="absolute top-3 left-3 flex gap-3">
	<PauseButton
		isPaused={automata?.state.isPaused ?? true}
		onclick={() => automata?.togglePause()}
	/>

	<SimulationSpeedSelector bind:selectedModifier={automata.state.simulationSpeedModifier} />

	<AutomataRuleSelect bind:rule={automata.state.rule} />

	<section class="flex items-center gap-2">
		<Checkbox bind:checked={automata.state.drawGrid} id="draw-grid-cb" />
		<Label for="draw-grid-cb">Draw Grid</Label>
	</section>
</div>
