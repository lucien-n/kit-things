import { BaseApplication, ApplicationType } from './base.svelte';

export class CanvasApplication extends BaseApplication {
	constructor(name: string) {
		super(name, ApplicationType.CANVAS);
	}
}
