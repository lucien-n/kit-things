import { SimulationSpeedModifier } from './(components)/simulation-speed-selector';

export class AutomataState {
	isPaused: boolean = $state(false);
	simulationSpeedModifier: SimulationSpeedModifier = $state(SimulationSpeedModifier.One);
}
