import type { SpecRecord } from './types';

export enum AutomataRule {
	Conway = 'Conway',
	HighLife = 'HighLife',
	Seeds = 'Seeds',
	Maze = 'Maze',
	DayNight = 'DayNight'
}

export const automataRuleSpecs: SpecRecord<
	AutomataRule,
	(isAlive: boolean, neighborsCount: number) => boolean
> = {
	[AutomataRule.Conway]: {
		id: AutomataRule.Conway,
		label: "Conway's Game Of Life",
		value: (alive, n) => (alive && (n === 2 || n === 3)) || (!alive && n === 3)
	},

	[AutomataRule.HighLife]: {
		id: AutomataRule.HighLife,
		label: 'HighLife (B36/S23)',
		value: (alive, n) => (alive && (n === 2 || n === 3)) || (!alive && (n === 3 || n === 6))
	},

	[AutomataRule.Seeds]: {
		id: AutomataRule.Seeds,
		label: 'Seeds (B2/S0)',
		value: (_alive, n) => n === 2
	},

	[AutomataRule.Maze]: {
		id: AutomataRule.Maze,
		label: 'Maze (B3/S12345)',
		value: (alive, n) => (alive && n >= 1 && n <= 5) || (!alive && n === 3)
	},

	[AutomataRule.DayNight]: {
		id: AutomataRule.DayNight,
		label: 'Day & Night (B3678/S34678)',
		value: (alive, n) =>
			(alive && [3, 4, 6, 7, 8].includes(n)) || (!alive && [3, 6, 7, 8].includes(n))
	}
};
