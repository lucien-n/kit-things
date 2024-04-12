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

	width = $state(32);
	height = $state(32);

	jump = $state(false);
	dead = $state(false);

	constructor({ x, y, width, height }: QuackInit) {
		if (x) this.x = x;
		if (y) this.y = y;
		if (width) this.width = width;
		if (height) this.height = height;
	}

	keypress(key: KeyboardEvent['key']) {
		switch (key) {
			case Controls.jump:
				this.jump = true;
				break;
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = Colors.quack;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	update(dt: number, walls: Wall[]) {
		if (this.jump) {
			this.velY = -(Settings.quackJumpImpulse * dt);
			this.jump = false;
		}
		this.velY += Settings.quackGravity * dt;

		walls.forEach((wall) => {
			if (!(this.x + this.width > wall.x && this.x < wall.x + Settings.wallWidth)) return;
			if (this.y > wall.gapStartY && this.y + this.height < wall.gapEndY) return;

			this.dead = true;
		});

		if (!this.dead) this.y += this.velY;
	}
}
