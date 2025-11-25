import type { AutomataSettings } from './automata-settings';
import type { AutomataWorld } from './automata-world';

export class AutomataRenderer {
	#ctx: CanvasRenderingContext2D;

	#camX = 0;
	#camY = 0;

	#isDragging = false;
	#dragStartX = 0;
	#dragStartY = 0;
	#camStartX = 0;
	#camStartY = 0;

	constructor(canvasEl: HTMLCanvasElement, settings: AutomataSettings) {
		const ctx = canvasEl.getContext('2d');
		if (!ctx) throw new Error('Could not get 2d canvas rendering context');
		this.#ctx = ctx;

		this.#ctx.imageSmoothingEnabled = false;
		canvasEl.style.background = '#222';

		canvasEl.addEventListener('pointerdown', this.#onPointerDown.bind(this));
		canvasEl.addEventListener('pointermove', this.#onPointerMove.bind(this));
		canvasEl.addEventListener('pointerup', () => (this.#isDragging = false));
		canvasEl.addEventListener('pointerleave', () => (this.#isDragging = false));

		window.addEventListener('resize', () => this.#onresize());
		this.#onresize();
	}

	screenToGrid(clientX: number, clientY: number, settings: AutomataSettings) {
		const canvas = this.#ctx.canvas;
		const rect = canvas.getBoundingClientRect();

		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		const canvasX = (clientX - rect.left) * scaleX;
		const canvasY = (clientY - rect.top) * scaleY;

		const worldX = canvasX - this.#camX;
		const worldY = canvasY - this.#camY;

		return {
			cellX: Math.floor(worldX / settings.CELL_SIZE),
			cellY: Math.floor(worldY / settings.CELL_SIZE)
		};
	}

	draw(world: AutomataWorld, settings: AutomataSettings) {
		const ctx = this.#ctx;
		const canvas = ctx.canvas;

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.setTransform(1, 0, 0, 1, this.#camX, this.#camY);

		for (const chunk of world.getChunks()) {
			const baseX = chunk.chunkX * settings.CHUNK_SIZE * settings.CELL_SIZE;
			const baseY = chunk.chunkY * settings.CHUNK_SIZE * settings.CELL_SIZE;

			ctx.fillStyle = '#eee';

			for (let i = 0; i < settings.CHUNK_SIZE * settings.CHUNK_SIZE; i++) {
				const cx = i % settings.CHUNK_SIZE;
				const cy = (i / settings.CHUNK_SIZE) | 0;

				if (!chunk.getCellAt(cx, cy)) continue;

				ctx.fillRect(
					baseX + cx * settings.CELL_SIZE,
					baseY + cy * settings.CELL_SIZE,
					settings.CELL_SIZE,
					settings.CELL_SIZE
				);
			}

			ctx.strokeStyle = '#444';
			ctx.strokeRect(
				baseX,
				baseY,
				settings.CHUNK_SIZE * settings.CELL_SIZE,
				settings.CHUNK_SIZE * settings.CELL_SIZE
			);
		}
	}

	get ctx() {
		return this.#ctx;
	}

	#onresize() {
		const canvas = this.#ctx.canvas;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	#onPointerDown(e: PointerEvent) {
		if (!e.ctrlKey || e.button !== 0) return;

		this.#isDragging = true;
		this.#dragStartX = e.clientX;
		this.#dragStartY = e.clientY;

		this.#camStartX = this.#camX;
		this.#camStartY = this.#camY;
	}

	#onPointerMove(e: PointerEvent) {
		if (!this.#isDragging) return;

		this.#camX = this.#camStartX + (e.clientX - this.#dragStartX);
		this.#camY = this.#camStartY + (e.clientY - this.#dragStartY);
	}
}
