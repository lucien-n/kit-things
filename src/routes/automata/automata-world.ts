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

		let cellX, cellY, deltaX, deltaY, neighborX, neighborY, neighborsCount: number;
		let isAlive: boolean;
		for (const chunk of this.#chunks.values()) {
			for (cellY = 0; cellY < size; cellY++) {
				for (cellX = 0; cellX < size; cellX++) {
					isAlive = chunk.getCellAt(cellX, cellY);
					neighborsCount = 0;

					for (deltaY = -1; deltaY <= 1; deltaY++) {
						for (deltaX = -1; deltaX <= 1; deltaX++) {
							neighborX = cellX + deltaX;
							neighborY = cellY + deltaY;

							if (chunk.isInBound(neighborX, neighborY)) {
								if (chunk.getCellAt(neighborX, neighborY)) neighborsCount++;
							} else if (
								this.getCellAt(chunk.chunkX * size + neighborX, chunk.chunkY * size + neighborY)
							)
								neighborsCount++;
						}
					}

					chunk.nextGrid[cellY * size + cellX] = automataRuleSpecs[rule].value(
						isAlive,
						neighborsCount
					)
						? 1
						: 0;
				}
			}

			chunk.grid = chunk.nextGrid;
		}
	}

	getChunks(): AutomataChunk[] {
		return Array.from(this.#chunks.values());
	}
}
