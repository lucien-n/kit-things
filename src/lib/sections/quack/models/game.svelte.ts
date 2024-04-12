import { browser } from '$app/environment';
import { Colors, Controls, Quack } from '.';

export class QuackGame {
	canvas = $state() as HTMLCanvasElement;
	ctx = $state() as CanvasRenderingContext2D;

	width = $state(0);
	height = $state(0);

	quack = $state() as Quack;

	now = $state(new Date().getTime());
	prevTime = $state(this.now);
	dt = $state(0);

	playing = $state(false);

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;

		this.init();
	}

	init() {
		this.resize();

		this.quack = new Quack({ x: 100, y: this.height / 2 });
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

	keypress(event: KeyboardEvent) {
		const key = event.key;

		if (key === Controls.jump && !this.playing) this.playing = true;

		this.quack.keypress(key);
	}

	update() {
		this.quack.update(this.dt);
	}

	draw() {
		this.quack.draw(this.ctx);
	}

	loop() {
		this.clear();

		this.now = new Date().getTime();
		this.dt = (this.now - this.prevTime) / 1000;
		this.prevTime = this.now;

		if (this.playing) {
			this.update();
		}

		this.draw();

		requestAnimationFrame(this.loop.bind(this));
	}
}
