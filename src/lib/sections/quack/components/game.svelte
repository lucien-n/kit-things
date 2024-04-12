<script lang="ts">
	import { onMount } from 'svelte';
	import { QuackGame } from '../models/';

	let canvas: HTMLCanvasElement | undefined = $state();
	let ctx: CanvasRenderingContext2D | null = $state(null);
	let game: QuackGame | undefined = $state();

	onMount(() => {
		if (!canvas) {
			console.warn('Canvas not bound');
			return;
		}

		ctx = canvas.getContext('2d');
		if (!ctx) {
			console.warn('Could not get canvas 2d context');
			return;
		}

		game = new QuackGame(canvas, ctx);
	});
</script>

<svelte:window on:resize={game?.resize} />

<canvas bind:this={canvas} />
