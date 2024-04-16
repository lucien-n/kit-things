import { BaseApplication } from '$windows/models/application';
import { ApplicationType } from '$windows/models/application/base.svelte';

export class BlankApplication extends BaseApplication {
	constructor() {
		super('blank', ApplicationType.HTML);
	}

	handleKeypress(event: KeyboardEvent): void {
		console.log(`keypress on blank "${event.key}"`);
	}
}
