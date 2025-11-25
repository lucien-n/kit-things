import { simulationSpeedModifiers } from './(components)/simulation-speed-selector';
import { AutomataRenderer } from './automata-renderer';
import { AutomataSettings } from './automata-settings';
import { AutomataState } from './automata-state.svelte';
import { AutomataWorld } from './automata-world';

export class Automata {
	#settings: AutomataSettings;
	#world: AutomataWorld;
	#renderer: AutomataRenderer;

	public readonly state: AutomataState = new AutomataState();

	constructor(canvasEl: HTMLCanvasElement) {
		this.#settings = new AutomataSettings();
		this.#world = new AutomataWorld(this.#settings);
		this.#renderer = new AutomataRenderer(canvasEl, this.#settings);

		canvasEl.addEventListener('click', this.handleClick.bind(this));
		window.addEventListener('keydown', this.handleKeypress.bind(this));
	}

	handleClick(ev: PointerEvent) {
		const { cellX, cellY } = this.#renderer.screenToGrid(ev.clientX, ev.clientY, this.#settings);

		this.#world.flipCellAt(cellX, cellY);
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
			this.#world.tick(this.state.rule);
		}

		setTimeout(
			() => this.tick(),
			1000 / 8 / simulationSpeedModifiers[this.state.simulationSpeedModifier].value
		);
	}

	run() {
		this.tick();

		const loop = () => {
			this.#renderer.draw(this.#world, this.#settings);
			requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
	}
}
