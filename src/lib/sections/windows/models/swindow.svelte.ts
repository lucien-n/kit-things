import { Vector } from '$lib/vector.svelte';
import { nanoid } from 'nanoid';
import type { BaseApplication } from './application';

export enum SwindowState {
	FULLSCREEN = 'FULLSCREEN',
	FLOATING = 'FLOATING',
	MINIMIZED = 'MINIMIZED'
}

export type SwindowInput = {
	title: string;
	icon?: string;
	position?: Vector;
	size?: Vector;
	application: BaseApplication;
};

export class Swindow {
	id: string = nanoid(12);

	title: string = $state('Generic title');
	icon: string = $state('🎉');

	position: Vector = $state(Vector.ZERO);
	previousPosition: Vector = $state(Vector.ZERO);

	size: Vector = $state(new Vector(640, 360));
	previousSize: Vector = $state(new Vector(640, 360));

	state: SwindowState = $state(SwindowState.FLOATING);
	focused: boolean = $state(false);

	application = $state() as BaseApplication;

	constructor({ title, icon, position, size, application }: SwindowInput) {
		this.title = title;
		this.application = application;

		if (icon) this.icon = icon;

		if (position) this.position = position;
		if (size) this.size = size;
	}

	enterFullscreen() {
		this.previousSize = this.size;
		this.previousPosition = this.position;
		this.size = new Vector(window.innerWidth, window.innerHeight);
		this.position = Vector.ZERO;
		this.state = SwindowState.FULLSCREEN;
	}

	exitFullscreen() {
		this.size = this.previousSize;
		this.position = this.previousPosition;
		this.state = SwindowState.FLOATING;
	}

	isFullscreen() {
		return this.state === SwindowState.FULLSCREEN;
	}

	handleKeypress(event: KeyboardEvent) {
		if (!this.application) {
			console.log(`No application for "${this.title}"`);
			return;
		}

		this.application.handleKeypress(event);
	}
}
