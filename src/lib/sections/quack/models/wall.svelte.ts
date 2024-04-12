import { Colors } from './colors';
import { Settings } from './settings';

export type WallInit = {
	x?: number;
	width?: number;
	height?: number;
};

export class Wall {
	x = $state(0);
	gapY = $state(0);

	constructor({ x }: WallInit) {
		if (x) this.x = x;

		this.gapY = Math.floor((Math.random() * window.innerHeight) / 2);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = Colors.wall;
		ctx.fillRect(this.x, 0, Settings.wallWidth, this.gapY);
		ctx.fillRect(
			this.x,
			this.gapY + Settings.wallGapHeight,
			Settings.wallWidth,
			window.innerHeight - this.gapY + Settings.wallGapHeight
		);
	}

	update(dt: number) {
		this.x -= 150 * dt;
	}
}
