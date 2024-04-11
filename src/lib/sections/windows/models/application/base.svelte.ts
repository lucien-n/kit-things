export enum ApplicationType {
	CANVAS = 'CANVAS',
	HTML = 'HTML'
}

export class BaseApplication {
	private _name: string;
	private _type: ApplicationType;

	constructor(name: string, type: ApplicationType) {
		this._name = name;
		this._type = type;
	}

	get name() {
		return this._name;
	}

	get type() {
		return this._type;
	}
}
