import type { AutomataSettings } from './automata-settings';

export class AutomataChunk {
	#grid: boolean[] = [];

	constructor(
		public readonly chunkX: number,
		public readonly chunkY: number,
		public readonly settings: AutomataSettings
	) {
		this.#grid = Array.from(
			{ length: this.settings.CHUNK_SIZE * this.settings.CHUNK_SIZE },
			() => false
		);
	}

	getCellAt(x: number, y: number): boolean {
		if (!this.isInBound(x, y)) return false;
		return this.#grid[y * this.settings.CHUNK_SIZE + x];
	}

	setCellAt(x: number, y: number, isAlive: boolean): void {
		this.#grid[y * this.settings.CHUNK_SIZE + x] = isAlive;
	}

	isInBound(x: number, y: number): boolean {
		return x >= 0 && x < this.settings.CHUNK_SIZE && y >= 0 && y < this.settings.CHUNK_SIZE;
	}

	replaceGrid(newGrid: boolean[]) {
		this.#grid = newGrid;
	}
}
