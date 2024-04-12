import { browser } from '$app/environment';
import { Colors } from '.';

export class QuackGame {
	canvas = $state() as HTMLCanvasElement;
	ctx = $state() as CanvasRenderingContext2D;

	width = $state(0);
	height = $state(0);

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
	}

	resize() {
		if (!browser) {
			console.warn("Not in browser, couldn't resize canvas");
			return;
		}

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	clear() {
		this.ctx.fillStyle = Colors.background;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	update() {
		this.clear();

		requestAnimationFrame(this.update);
	}
}
