import { browser } from '$app/environment';
import { Colors, Controls, Quack, Settings, Wall } from '.';

export class QuackGame {
	canvas = $state() as HTMLCanvasElement;
	ctx = $state() as CanvasRenderingContext2D;

	width = $state(0);
	height = $state(0);

	quack = $state() as Quack;
	walls = $state([]) as Wall[];

	now = $state(new Date().getTime());
	prevTime = $state(this.now);
	dt = $state(0);

	playing = $state(false);
	wallsPassed = $state(0);

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;

		this.init();
	}

	init() {
		this.resize();

		this.quack = new Quack({ x: this.width * 0.33, y: this.height / 2 });
		this.walls = [];
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

		if (key === Controls.jump && !this.playing) {
			this.init();
			this.playing = true;
		}

		this.quack.keypress(key);
	}

	update() {
		this.quack.update(this.dt, this.walls);
		this.playing = !this.quack.dead;

		this.walls.forEach((wall) => {
			wall.update(this.dt, this.wallsPassed);
			if (!wall.passed && this.quack.x > wall.x + Settings.wallWidth) {
				wall.passed = true;
				this.wallsPassed++;
			}
		});
		this.walls = this.walls.filter((wall) => wall.x > -Settings.wallWidth);

		const lastWall = this.walls[this.walls.length - 1] as Wall | undefined;
		if (!lastWall || lastWall.x < window.innerWidth * 0.7) {
			const wall = new Wall({ x: window.innerWidth });
			this.walls.push(wall);
		}
	}

	draw() {
		this.quack.draw(this.ctx);
		this.walls.forEach((wall) => wall.draw(this.ctx));
	}

	loop() {
		this.clear();

		this.now = new Date().getTime();
		this.dt = (this.now - this.prevTime) / 1000;
		this.prevTime = this.now;

		if (this.playing && !this.quack.dead) {
			this.update();
		}

		this.draw();

		requestAnimationFrame(this.loop.bind(this));
	}
}
