import type { SpecRecord } from './types';

export enum AutomataRule {
	Conway = 'Conway'
}

export const automataRuleSpecs: SpecRecord<
	AutomataRule,
	(isAlive: boolean, neighborsCount: number) => boolean
> = {
	[AutomataRule.Conway]: {
		id: AutomataRule.Conway,
		label: "Conway's Game Of Life",
		value: (isAlive, n) => (isAlive && (n === 2 || n === 3)) || (!isAlive && n === 3)
	}
};
