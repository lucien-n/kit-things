import type { AutomataSettings } from './automata-settings';

export class AutomataChunk {
	grid: Uint8Array;
	nextGrid: Uint8Array;

	constructor(
		public readonly chunkX: number,
		public readonly chunkY: number,
		public readonly settings: AutomataSettings
	) {
		this.grid = AutomataChunk.initializeGrid(settings.CHUNK_SIZE);
		this.nextGrid = AutomataChunk.initializeGrid(settings.CHUNK_SIZE);
	}

	static initializeGrid(chunkSize: number): Uint8Array {
		return new Uint8Array(chunkSize * chunkSize);
	}

	getCellAt(x: number, y: number): boolean {
		return this.grid[y * this.settings.CHUNK_SIZE + x] != 0;
	}

	setCellAt(x: number, y: number, isAlive: boolean): void {
		this.grid[y * this.settings.CHUNK_SIZE + x] = isAlive ? 1 : 0;
	}

	isInBound(x: number, y: number): boolean {
		return x >= 0 && x < this.settings.CHUNK_SIZE && y >= 0 && y < this.settings.CHUNK_SIZE;
	}
}
