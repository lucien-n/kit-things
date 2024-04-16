import { CanvasApplication } from '$windows/models/application';

export class TestApplication extends CanvasApplication {
	constructor() {
		super('test');
	}

	handleKeypress(event: KeyboardEvent): void {
		console.log(`key press "${event.key}"`);
	}
}
