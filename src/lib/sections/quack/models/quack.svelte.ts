import { Colors, Controls, Settings, Wall } from '.';

export type QuackInit = {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
};

export class Quack {
	x = $state(0);
	y = $state(0);

	velX = $state(0);
	velY = $state(0);

	width = $state(28);
	height = $state(19);

	jump = $state(false);
	dead = $state(false);

	sprite: HTMLImageElement | null = null;
	totalFrames = 0;
	currentFrame = 0;
	lastFrameAt = 0;

	constructor({ x, y, width, height }: QuackInit) {
		if (x) this.x = x;
		if (y) this.y = y;
		if (width) this.width = width;
		if (height) this.height = height;

		this.init();
	}

	init() {
		const sprite = new Image();
		sprite.src = 'quack/quack.png';
		sprite.onload = () => {
			this.sprite = sprite;
			this.totalFrames = Math.floor(sprite.width / this.width);
		};
	}

	keypress(key: KeyboardEvent['key']) {
		switch (key) {
			case Controls.jump:
				this.jump = true;
				break;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		const now = new Date().getTime();
		if (now - this.lastFrameAt > 250) {
			this.currentFrame++;
			this.lastFrameAt = now;
			if (this.currentFrame >= this.totalFrames) this.currentFrame = 0;
		}

		if (this.sprite) {
			ctx.drawImage(
				this.sprite,
				this.currentFrame * this.width,
				0,
				this.width,
				this.height,
				this.x,
				this.y,
				this.width,
				this.height
			);
		} else {
			ctx.fillStyle = Colors.quack;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	update(dt: number, walls: Wall[]) {
		if (this.jump) {
			this.velY = -(Settings.quackJumpImpulse * dt);
			this.jump = false;
		}
		this.velY += Settings.quackGravity * dt;
		if (this.velY > 12) this.velY = 12;

		walls.forEach((wall) => {
			const isInWall = this.x + this.width > wall.x && this.x < wall.x + Settings.wallWidth;
			const isInGap = this.y > wall.gapStartY && this.y + this.height < wall.gapEndY;

			if (isInWall && !isInGap) this.dead = true;
		});

		if (this.y > window.innerHeight) this.dead = true;

		if (!this.dead) this.y += this.velY;
	}
}
