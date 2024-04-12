import { Colors, Settings } from '.';

export type WallInit = {
	x?: number;
	width?: number;
	height?: number;
};

export class Wall {
	x = $state(0);
	gapStartY = $state(0);
	gapEndY = $state(0);

	constructor({ x }: WallInit) {
		if (x) this.x = x;

		this.gapStartY = Math.floor((Math.random() * window.innerHeight) / 2);
		this.gapEndY = this.gapStartY + Settings.wallGapHeight;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = Colors.wall;
		ctx.fillRect(this.x, 0, Settings.wallWidth, this.gapStartY);
		ctx.fillRect(this.x, this.gapEndY, Settings.wallWidth, window.innerHeight - this.gapEndY);
	}

	update(dt: number) {
		this.x -= Settings.wallBaseSpeed * dt;
	}
}
