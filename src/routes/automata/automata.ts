import { simulationSpeedModifiers } from './(components)/simulation-speed-selector';
import { automataRuleSpecs } from './(specs)';
import { AutomataData } from './automata-data';
import { AutomataRenderer } from './automata-renderer';
import { AutomataSettings } from './automata-settings';
import { AutomataState } from './automata-state.svelte';

export class Automata {
	#settings: AutomataSettings;
	#data: AutomataData;
	#renderer: AutomataRenderer;

	public readonly state: AutomataState = new AutomataState();

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
		this.state.isPaused = !this.state.isPaused;
	}

	tick() {
		if (!this.state.isPaused) {
			const size = this.#settings.GRID_SIZE;

			const next = Array.from({ length: size }, () => Array.from({ length: size }, () => false));

			let x, y: number;
			let isAlive: boolean;
			let neighborsCount: number;
			for (let idx = 0; idx < size * size; idx++) {
				x = idx % size;
				y = Math.floor(idx / size);

				isAlive = this.#data.getCellAt(x, y);
				neighborsCount = this.#data.countNeighbors(x, y);

				next[y][x] = automataRuleSpecs[this.state.rule].value(isAlive, neighborsCount);
			}

			this.#data.replaceGrid(next);
		}

		setTimeout(
			() => this.tick(),
			1000 / 8 / simulationSpeedModifiers[this.state.simulationSpeedModifier].value
		);
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
