import type { AutomataSettings } from './automata-settings';

export class AutomataData {
	#grid: boolean[][] = [];

	constructor(public readonly settings: AutomataSettings) {
		this.#grid = Array.from({ length: this.settings.GRID_SIZE }, () =>
			Array.from({ length: this.settings.GRID_SIZE }, () => false)
		);
	}

	getCellAt(x: number, y: number): boolean {
		if (!this.isInBound(x, y)) return false;
		return this.#grid[y][x];
	}

	setCellAt(x: number, y: number, alive: boolean): void {
		this.#grid[y][x] = alive;
	}

	flipCellAt(x: number, y: number): void {
		if (!this.isInBound(x, y)) return;

		const newState = !this.getCellAt(x, y);
		this.setCellAt(x, y, newState);
	}

	isInBound(x: number, y: number): boolean {
		return x >= 0 && x < this.settings.GRID_SIZE && y >= 0 && y < this.settings.GRID_SIZE;
	}

	replaceGrid(newGrid: boolean[][]): void {
		this.#grid = newGrid;
	}

	countNeighbors(x: number, y: number) {
		let neighborCount = 0;

		let neighborX, neighborY: number;
		for (let deltaY = -1; deltaY <= 1; deltaY++) {
			for (let deltaX = -1; deltaX <= 1; deltaX++) {
				if (deltaX === 0 && deltaY === 0) continue;

				neighborX = x + deltaX;
				neighborY = y + deltaY;

				if (this.getCellAt(neighborX, neighborY)) neighborCount++;
			}
		}

		return neighborCount;
	}
}
