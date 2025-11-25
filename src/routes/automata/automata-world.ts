import { automataRuleSpecs, type AutomataRule } from './(specs)';
import { AutomataChunk } from './automata-chunk';
import type { AutomataSettings } from './automata-settings';

export class AutomataWorld {
	#chunks: Map<number, AutomataChunk> = new Map();

	constructor(public readonly settings: AutomataSettings) {}

	hashCoords(x: number, y: number) {
		return (x << 16) ^ y;
	}

	private worldToChunkCoords(x: number, y: number): { chunkX: number; chunkY: number } {
		const chunkX = Math.floor(x / this.settings.CHUNK_SIZE);
		const chunkY = Math.floor(y / this.settings.CHUNK_SIZE);

		return { chunkX, chunkY };
	}

	private worldToCellCoords(
		worldX: number,
		worldY: number,
		chunkX: number,
		chunkY: number
	): { cellX: number; cellY: number } {
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
		const size = this.settings.CHUNK_SIZE;

		let cellX, cellY, worldX, worldY, neighborsCount: number;
		let isAlive: boolean;
		for (const chunk of this.#chunks.values()) {
			const next = Array.from({ length: size * size }, () => false);

			for (let idx = 0; idx < size * size; idx++) {
				cellX = idx % size;
				cellY = (idx / size) | 0;

				worldX = chunk.chunkX * size + cellX;
				worldY = chunk.chunkY * size + cellY;

				isAlive = this.getCellAt(worldX, worldY);
				neighborsCount = this.countNeighbors(worldX, worldY);

				next[idx] = automataRuleSpecs[rule].value(isAlive, neighborsCount);
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
