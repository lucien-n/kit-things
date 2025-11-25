import { automataRuleSpecs, type AutomataRule } from './(specs)';
import { AutomataChunk } from './automata-chunk';
import type { AutomataSettings } from './automata-settings';

export class AutomataWorld {
	#chunks: Map<number, AutomataChunk> = new Map();

	constructor(public readonly settings: AutomataSettings) {}

	hashCoords(x: number, y: number) {
		return (x << this.settings.CHUNK_SIZE) ^ y;
	}

	private worldToChunkCoords(x: number, y: number): { chunkX: number; chunkY: number } {
		const chunkX = Math.floor(x / this.settings.CHUNK_SIZE);
		const chunkY = Math.floor(y / this.settings.CHUNK_SIZE);

		return { chunkX, chunkY };
	}

	private worldToCellCoords(
		worldX: number,
		worldY: number,
		chunkX?: number,
		chunkY?: number
	): { cellX: number; cellY: number } {
		if (!chunkX || !chunkY) {
			const { chunkX: cx, chunkY: cy } = this.worldToChunkCoords(worldX, worldY);
			chunkX = cx;
			chunkY = cy;
		}

		const cellX = worldX - chunkX * this.settings.CHUNK_SIZE;
		const cellY = worldY - chunkY * this.settings.CHUNK_SIZE;

		return { cellX, cellY };
	}

	getCellAt(worldX: number, worldY: number): boolean {
		const { chunkX, chunkY } = this.worldToChunkCoords(worldX, worldY);
		const chunkKey = this.hashCoords(chunkX, chunkY);

		const chunk = this.#chunks.get(chunkKey);
		if (!chunk) return false;

		const { cellX, cellY } = this.worldToCellCoords(worldX, worldY, chunkX, chunkY);

		return chunk?.getCellAt(cellX, cellY) ?? false;
	}

	setCellAt(worldX: number, worldY: number, isAlive: boolean): void {
		const { chunkX, chunkY } = this.worldToChunkCoords(worldX, worldY);
		const chunkKey = this.hashCoords(chunkX, chunkY);

		let chunk = this.#chunks.get(chunkKey);
		if (!chunk) {
			chunk = new AutomataChunk(chunkX, chunkY, this.settings);
			this.#chunks.set(chunkKey, chunk);
		}

		const { cellX, cellY } = this.worldToCellCoords(worldX, worldY, chunkX, chunkY);

		chunk.setCellAt(cellX, cellY, isAlive);
	}

	flipCellAt(worldX: number, worldY: number): void {
		const newState = !this.getCellAt(worldX, worldY);
		this.setCellAt(worldX, worldY, newState);
	}

	tick(rule: AutomataRule) {
		for (const chunk of this.#chunks.values()) {
			const size = this.settings.CHUNK_SIZE;

			const next = Array.from({ length: size * size }, () => false);

			let x, y: number;
			let isAlive: boolean;
			let neighborsCount: number;
			for (let idx = 0; idx < size * size; idx++) {
				x = idx % size;
				y = Math.floor(idx / size);

				isAlive = this.getCellAt(x, y);
				neighborsCount = this.countNeighbors(x, y);

				next[y * size + x] = automataRuleSpecs[rule].value(isAlive, neighborsCount);
			}

			chunk.replaceGrid(next);
		}
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

	getChunks(): AutomataChunk[] {
		return Array.from(this.#chunks.values());
	}
}
