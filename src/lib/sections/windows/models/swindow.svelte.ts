import { Vector } from '$lib/vector.svelte';
import { nanoid } from 'nanoid';

export enum SwindowState {
	FULLSCREEN = 'FULLSCREEN',
	FLOATING = 'FLOATING',
	MINIMIZED = 'MINIMIZED'
}

export class Swindow {
	id: string = nanoid(12);

	title: string = $state('Generic title');
	icon: string = $state('🎉');

	position: Vector = $state(Vector.ZERO);
	previousPosition: Vector = $state(Vector.ZERO);

	size: Vector = $state(new Vector(640, 360));
	previousSize: Vector = $state(new Vector(640, 360));

	state: SwindowState = $state(SwindowState.FLOATING);

	constructor(title: string, icon?: string, position?: Vector, size?: Vector) {
		this.title = title;

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
}
