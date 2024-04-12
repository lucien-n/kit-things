<script lang="ts">
	import { onMount } from 'svelte';
	import { Controls, QuackGame } from '../models/';
	import { Card } from '$shadcn/ui/card';
	import { Label } from '$shadcn/ui/label';
	import { fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	let canvas: HTMLCanvasElement | undefined = $state();
	let ctx: CanvasRenderingContext2D | null = $state(null);
	let game: QuackGame | undefined = $state();

	onMount(() => {
		if (!canvas) {
			console.warn('Canvas not bound');
			return;
		}
		canvas.focus();

		ctx = canvas.getContext('2d');
		if (!ctx) {
			console.warn('Could not get canvas 2d context');
			return;
		}

		game = new QuackGame(canvas, ctx);
		game.loop();
	});
</script>

<svelte:window on:resize={game?.resize} on:keypress={(event) => game?.keypress(event)} />

<Card class="absolute z-50 m-3 grid w-64 grid-cols-2 gap-3 px-3 py-2 ">
	<Label class="font-bold">DT</Label>
	<Label>{game?.dt}</Label>

	<Label class="font-bold">PLAYING</Label>
	<Label>{game?.playing}</Label>

	<Label class="font-bold">WALLS</Label>
	<Label>{game?.walls.length}</Label>

	<Label class="font-bold">PASSED</Label>
	<Label>{game?.wallsPassed}</Label>

	<Label class="font-bold">VEL</Label>
	<div class="flex gap-2">
		<Label>{game?.quack.velX.toFixed(2)}</Label>
		<Label>{game?.quack.velY.toFixed(2)}</Label>
	</div>
</Card>

<!-- svelte-ignore a11y-positive-tabindex -->
<canvas tabindex="1" bind:this={canvas} class="absolute left-0 top-0" />

{#if game}
	{@const jumpControlLabel = Controls.jump === ' ' ? 'space' : Controls.jump}
	{#if !game.playing}
		<div
			class="flex h-full w-full animate-pulse items-center justify-center bg-opacity-10 backdrop-blur-lg"
			transition:fly={{ y: -800, easing: backInOut, duration: 700 }}
		>
			<p class="text-5xl font-bold">
				Press <u>{jumpControlLabel}</u> to start
			</p>
		</div>
	{/if}
{/if}
