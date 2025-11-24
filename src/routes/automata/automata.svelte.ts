import { AutomataData } from './automata-data';
import { AutomataRenderer } from './automata-renderer';
import { AutomataSettings } from './automata-settings';

export class Automata {
	#settings: AutomataSettings;
	#data: AutomataData;
	#renderer: AutomataRenderer;

	isPaused: boolean = $state(false);

	constructor(canvasEl: HTMLCanvasElement) {
		this.#settings = new AutomataSettings();
		this.#data = new AutomataData(this.#settings);
		this.#renderer = new AutomataRenderer(canvasEl, this.#settings);

		canvasEl.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick(ev: PointerEvent) {
		const { cellX, cellY } = this.#renderer.screenToGrid(ev.clientX, ev.clientY, this.#settings);

		this.#data.flipCellAt(cellX, cellY);
	}

	pause() {
		this.isPaused = !this.isPaused;
	}

	tick() {
		if (this.isPaused) return;

		const size = this.#settings.GRID_SIZE;

		const next = Array.from({ length: size }, () => Array.from({ length: size }, () => false));

		let x, y: number;
		let alive: boolean;
		let neighborsCount: number;
		for (let idx = 0; idx < size * size; idx++) {
			x = idx % size;
			y = Math.floor(idx / size);

			alive = this.#data.getCellAt(x, y);

			neighborsCount = 0;

			if (this.#data.getCellAt(x, y - 1)) neighborsCount++;
			if (this.#data.getCellAt(x + 1, y)) neighborsCount++;
			if (this.#data.getCellAt(x, y + 1)) neighborsCount++;
			if (this.#data.getCellAt(x - 1, y)) neighborsCount++;

			next[y][x] =
				(alive && (neighborsCount === 1 || neighborsCount === 2)) ||
				(!alive && neighborsCount === 2);
		}

		this.#data.replaceGrid(next);
	}

	run() {
		setInterval(() => this.tick(), 1000 / 8);

		const loop = () => {
			this.#renderer.draw(this.#data, this.#settings);
			requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
	}
}
