import SimulationSpeedSelector from './SimulationSpeedSelector.svelte';

export enum SimulationSpeedModifier {
	Quarter = 'Quarter',
	Half = 'Half',
	One = 'One',
	Five = 'Five',
	Ten = 'Ten',
	Fifty = 'Fifty'
}

export const simulationSpeedModifiers: Record<
	SimulationSpeedModifier,
	{ label: string; value: number }
> = {
	[SimulationSpeedModifier.Quarter]: {
		label: 'x0.25',
		value: 0.25
	},
	[SimulationSpeedModifier.Half]: {
		label: 'x0.5',
		value: 0.5
	},
	[SimulationSpeedModifier.One]: {
		label: 'x1',
		value: 1
	},
	[SimulationSpeedModifier.Five]: {
		label: 'x5',
		value: 5
	},
	[SimulationSpeedModifier.Ten]: {
		label: 'x10',
		value: 10
	},
	[SimulationSpeedModifier.Fifty]: {
		label: 'x50',
		value: 50
	}
};

export { SimulationSpeedSelector };
