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

	#zoom = 1;
	#minZoom = 0.1;
	#maxZoom = 4;

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

		canvasEl.addEventListener('wheel', this.#onWheel.bind(this), { passive: false });

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

		const worldX = (canvasX - this.#camX) / this.#zoom;
		const worldY = (canvasY - this.#camY) / this.#zoom;

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

		ctx.setTransform(this.#zoom, 0, 0, this.#zoom, this.#camX, this.#camY);

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
		if (e.button !== 1) return;

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

	#onWheel(e: WheelEvent) {
		e.preventDefault();

		const zoomIntensity = 0.001;
		const oldZoom = this.#zoom;

		this.#zoom -= e.deltaY * zoomIntensity;
		this.#zoom = Math.min(this.#maxZoom, Math.max(this.#minZoom, this.#zoom));

		const canvas = this.#ctx.canvas;
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		const mouseCanvasX = (e.clientX - rect.left) * scaleX;
		const mouseCanvasY = (e.clientY - rect.top) * scaleY;

		const worldXBefore = (mouseCanvasX - this.#camX) / oldZoom;
		const worldYBefore = (mouseCanvasY - this.#camY) / oldZoom;

		this.#camX = mouseCanvasX - worldXBefore * this.#zoom;
		this.#camY = mouseCanvasY - worldYBefore * this.#zoom;
	}
}
