export interface Spec<ID extends string, Value extends unknown> {
	id: ID;
	label: string;
	value: Value;
}

export type SpecRecord<ID extends string, Value extends unknown> = { [Key in ID]: Spec<ID, Value> };
