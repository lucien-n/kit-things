import type { AutomataSettings } from './automata-settings';
import type { AutomataWorld } from './automata-world';

export class AutomataRenderer {
	#ctx: CanvasRenderingContext2D;
	#offsetX = 0;
	#offsetY = 0;

	constructor(canvasEl: HTMLCanvasElement, settings: AutomataSettings) {
		const ctx = canvasEl.getContext('2d');
		if (!ctx) throw new Error('Could not get 2d canvas rendering context');
		this.#ctx = ctx;

		window.addEventListener('resize', this.#handleResize.bind(this, settings));
		this.#handleResize(settings);

		canvasEl.style.background = '#222';
	}

	screenToGrid(
		clientX: number,
		clientY: number,
		settings: AutomataSettings
	): { cellX: number; cellY: number } {
		const canvas = this.#ctx.canvas;
		const rect = canvas.getBoundingClientRect();

		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const canvasX = (clientX - rect.left) * scaleX;
		const canvasY = (clientY - rect.top) * scaleY;

		const localX = canvasX - this.#offsetX;
		const localY = canvasY - this.#offsetY;

		const cellX = Math.floor(localX / settings.CELL_SIZE);
		const cellY = Math.floor(localY / settings.CELL_SIZE);

		return { cellX, cellY };
	}

	draw(world: AutomataWorld, settings: AutomataSettings) {
		const ctx = this.#ctx;
		const canvas = ctx.canvas;

		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();

		let cellX, cellY: number;
		let chunkWorldX, chunkWorldY: number;
		let idx: number;
		for (const chunk of world.getChunks()) {
			ctx.fillStyle = '#eee';

			chunkWorldX = chunk.chunkX * settings.CHUNK_SIZE;
			chunkWorldY = chunk.chunkY * settings.CHUNK_SIZE;

			for (idx = 0; idx < settings.CHUNK_SIZE * settings.CHUNK_SIZE; idx++) {
				cellX = idx % settings.CHUNK_SIZE;
				cellY = Math.floor(idx / settings.CHUNK_SIZE);

				if (chunk.getCellAt(cellX, cellY))
					ctx.fillRect(
						cellX * settings.CELL_SIZE + chunkWorldX,
						cellY * settings.CELL_SIZE + chunkWorldY,
						settings.CELL_SIZE,
						settings.CELL_SIZE
					);
			}

			ctx.strokeStyle = '#444';
			ctx.beginPath();
			ctx.rect(
				chunkWorldX,
				chunkWorldY,
				settings.CELL_SIZE * settings.CHUNK_SIZE,
				settings.CELL_SIZE * settings.CHUNK_SIZE
			);
			ctx.stroke();
		}
	}

	get ctx(): CanvasRenderingContext2D {
		return this.#ctx;
	}

	#handleResize(settings: AutomataSettings) {
		const canvas = this.#ctx.canvas;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		this.#offsetX = canvas.width / 2 - (settings.CELL_SIZE * settings.CHUNK_SIZE) / 2;
		this.#offsetY = canvas.height / 2 - (settings.CELL_SIZE * settings.CHUNK_SIZE) / 2;

		this.#ctx.setTransform(1, 0, 0, 1, this.#offsetX, this.#offsetY);
	}
}
