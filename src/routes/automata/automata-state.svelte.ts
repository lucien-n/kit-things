import { SimulationSpeedModifier } from './(components)/simulation-speed-selector';
import { AutomataRule } from './(specs)';

export class AutomataState {
	isPaused: boolean = $state(true);
	simulationSpeedModifier: SimulationSpeedModifier = $state(SimulationSpeedModifier.One);
	rule: AutomataRule = $state(AutomataRule.Conway);

	debug: Record<string, string> = $state({});

	isMousePressed: boolean = $state(false);
	prevMousePos: { x: number; y: number } = $state({ x: 0, y: 0 });
	mousePos: { x: number; y: number } = $state({ x: 0, y: 0 });

	drawGrid: boolean = $state(false);
}
