import { SimulationSpeedModifier } from './(components)/simulation-speed-selector';
import { AutomataRule } from './(specs)';

export class AutomataState {
	isPaused: boolean = $state(false);
	simulationSpeedModifier: SimulationSpeedModifier = $state(SimulationSpeedModifier.One);
	rule: AutomataRule = $state(AutomataRule.Conway);
}
