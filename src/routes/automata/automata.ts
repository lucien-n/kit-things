import { simulationSpeedModifiers } from './(components)/simulation-speed-selector';
import { AutomataRenderer } from './automata-renderer';
import { AutomataSettings } from './automata-settings';
import { AutomataState } from './automata-state.svelte';
import { AutomataWorld } from './automata-world';

export class Automata {
	#settings: AutomataSettings;
	#world: AutomataWorld;
	#renderer: AutomataRenderer;

	readonly state: AutomataState;

	constructor(canvasEl: HTMLCanvasElement) {
		this.#settings = new AutomataSettings();
		this.#world = new AutomataWorld(this.#settings);
		this.#renderer = new AutomataRenderer(canvasEl, this.#settings);
		this.state = new AutomataState();

		canvasEl.addEventListener('mousedown', this.handleMouseDown.bind(this));
		canvasEl.addEventListener('mouseup', this.handleMouseUp.bind(this));
		canvasEl.addEventListener('mousemove', this.handleMouseMove.bind(this));
		window.addEventListener('keydown', this.handleKeypress.bind(this));
	}

	handleMouseDown() {
		this.state.isMousePressed = true;
	}

	handleMouseUp() {
		this.state.isMousePressed = false;
	}

	handleMouseMove(ev: MouseEvent) {
		this.state.mousePos = { x: ev.clientX, y: ev.clientY };

		if (this.state.isMousePressed) {
			const { cellX, cellY } = this.#renderer.screenToGrid(
				this.state.mousePos.x,
				this.state.mousePos.y,
				this.#settings
			);
			this.#world.setCellAt(cellX, cellY, true);
		}

		this.state.prevMousePos = this.state.mousePos;
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
			const t1 = performance.now();
			this.#world.tick(this.state.rule);
			const tickTime = performance.now() - t1;
			this.state.debug.lastTickTime = tickTime.toFixed(2) + 'ms';
		}

		setTimeout(
			() => this.tick(),
			1000 / 8 / simulationSpeedModifiers[this.state.simulationSpeedModifier].value
		);
	}

	run() {
		this.tick();

		const loop = () => {
			this.#renderer.draw(this.#world, this.#settings, this.state.drawGrid);
			requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
	}
}
