import { AutomataData } from './automata-data';
import { AutomataRenderer } from './automata-renderer';
import { AutomataSettings } from './automata-settings';

export class Automata {
	#settings: AutomataSettings;
	#data: AutomataData;
	#renderer: AutomataRenderer;

	isPaused: boolean = $state(true);

	simulationSpeedFactor: number = $state(1);

	constructor(canvasEl: HTMLCanvasElement) {
		this.#settings = new AutomataSettings();
		this.#data = new AutomataData(this.#settings);
		this.#renderer = new AutomataRenderer(canvasEl, this.#settings);

		canvasEl.addEventListener('click', this.handleClick.bind(this));
		window.addEventListener('keydown', this.handleKeypress.bind(this));
	}

	handleClick(ev: PointerEvent) {
		const { cellX, cellY } = this.#renderer.screenToGrid(ev.clientX, ev.clientY, this.#settings);

		this.#data.flipCellAt(cellX, cellY);
	}

	handleKeypress(ev: KeyboardEvent) {
		switch (ev.key) {
			case ' ':
				this.togglePause();
		}
	}

	togglePause() {
		this.isPaused = !this.isPaused;
	}

	tick() {
		if (!this.isPaused) {
			const size = this.#settings.GRID_SIZE;

			const next = Array.from({ length: size }, () => Array.from({ length: size }, () => false));

			let x, y: number;
			let alive: boolean;
			let neighborsCount: number;
			for (let idx = 0; idx < size * size; idx++) {
				x = idx % size;
				y = Math.floor(idx / size);

				alive = this.#data.getCellAt(x, y);
				neighborsCount = this.#data.countNeighbors(x, y);

				next[y][x] =
					(alive && (neighborsCount === 2 || neighborsCount === 3)) ||
					(!alive && neighborsCount === 3);
			}

			this.#data.replaceGrid(next);
		}

		setTimeout(() => this.tick(), 1000 / 8 / this.simulationSpeedFactor);
	}

	run() {
		this.tick();

		const loop = () => {
			this.#renderer.draw(this.#data, this.#settings);
			requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
	}
}
