<script lang="ts">
	import { onMount } from 'svelte';
	import { Label } from '$shadcn/ui/label';
	import { Checkbox } from '$shadcn/ui/checkbox';
	import { Input } from '$shadcn/ui/input';
	import { Card } from '$shadcn/ui/card';

	type Dot = {
		startX: number;
		startY: number;
		x: number;
		y: number;
		velX: number;
		velY: number;
	};

	let canvas: HTMLCanvasElement | undefined = $state();
	let ctx: CanvasRenderingContext2D | undefined = $state();

	let width = 0;
	let height = 0;

	let spacing = $state(50);
	let velocity = $state(0.005);
	let velocityCap = $state(0.3);
	let maxDistanceFromStart = $state(25);
	let clear = $state(true);
	let drawDebug = $state(false);

	const generateDots = (): Dot[] => {
		const dots: Dot[] = [];

		for (let y = 0; y < height / spacing; y++) {
			for (let x = 0; x < width / spacing; x++) {
				const dotX = x * spacing + spacing / 2;
				const dotY = y * spacing + spacing / 2;

				dots.push({
					x: dotX,
					y: dotY,
					velX: 0,
					velY: 0,
					startX: dotX,
					startY: dotY
				});
			}
		}

		return dots;
	};

	let dots = $state<Dot[]>([]);

	const handleResize = () => {
		if (!canvas) return;

		width = window.innerWidth;
		height = window.innerHeight;

		canvas.width = width;
		canvas.height = height;
		dots = generateDots();
	};

	const update = () => {
		if (!ctx) return;

		if (clear) {
			ctx.strokeStyle = 'white';
			ctx.clearRect(0, 0, width, height);
		}

		for (const dot of dots) {
			dot.velY += Math.round(Math.random()) ? -velocity : velocity;
			dot.velX += Math.round(Math.random()) ? -velocity : velocity;

			if (dot.velY > velocityCap) dot.velY = velocityCap;
			if (dot.velY < -velocityCap) dot.velY = -velocityCap;
			if (dot.velX > velocityCap) dot.velX = velocityCap;
			if (dot.velX < -velocityCap) dot.velX = -velocityCap;

			const distanceFromStart = Math.sqrt((dot.x - dot.startX) ** 2 + (dot.y - dot.startY) ** 2);
			if (distanceFromStart > maxDistanceFromStart) {
				const angle = Math.atan2(dot.y - dot.startY, dot.x - dot.startX);
				dot.velX = -Math.cos(angle) * velocity;
				dot.velY = -Math.sin(angle) * velocity;
			}

			dot.x += dot.velX;
			dot.y += dot.velY;

			ctx.fillStyle = 'black';
			ctx.fillRect(dot.x, dot.y, 3, 3);

			if (drawDebug) {
				ctx.fillStyle = 'rgba(255, 0, 0, .3)';
				ctx.fillRect(dot.startX - 2, dot.startY - 2, 5, 5);

				ctx.translate(dot.startX, dot.startY);
				ctx.beginPath();
				ctx.arc(0, 0, maxDistanceFromStart, 0, Math.PI * 2);
				ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
				ctx.stroke();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
		}

		for (const dot of dots) {
			dot.velY += Math.round(Math.random()) ? -velocity : velocity;
			dot.velX += Math.round(Math.random()) ? -velocity : velocity;

			if (dot.velY > velocityCap) dot.velY = velocityCap;
			if (dot.velY < -velocityCap) dot.velY = -velocityCap;
			if (dot.velX > velocityCap) dot.velX = velocityCap;
			if (dot.velX < -velocityCap) dot.velX = -velocityCap;

			const distanceFromStart = Math.sqrt((dot.x - dot.startX) ** 2 + (dot.y - dot.startY) ** 2);
			if (distanceFromStart > maxDistanceFromStart) {
				const angle = Math.atan2(dot.y - dot.startY, dot.x - dot.startX);
				dot.velX = -Math.cos(angle) * velocity;
				dot.velY = -Math.sin(angle) * velocity;
			}

			dot.x += dot.velX;
			dot.y += dot.velY;
		}

		requestAnimationFrame(update);
	};

	onMount(() => {
		if (!canvas) return;

		const context = canvas.getContext('2d');
		if (!context) return;

		ctx = context;
		handleResize();

		requestAnimationFrame(update);
	});
</script>

<svelte:window onresize={handleResize} />
<div class="absolute left-0 top-0 p-3">
	<Card class="grid grid-cols-2 items-center gap-4 px-3 py-2">
		<Label for="clearCheckbox" class="font-bold">CLEAR</Label>
		<Checkbox id="clearCheckbox" bind:checked={clear} />

		<Label for="drawDebugCheckbox" class="font-bold">DRAW DEBUG</Label>
		<Checkbox id="drawDebugCheckbox" bind:checked={drawDebug} />

		<Label for="maxDistanceInput" class="font-bold">MAX DISTANCE</Label>
		<Input
			id="maxDistanceInput"
			type="number"
			min="0"
			max="500"
			bind:value={maxDistanceFromStart}
		/>

		<Label for="velocityInput" class="font-bold">VELOCITY</Label>
		<Input id="velocityInput" type="number" bind:value={velocity} />

		<Label for="velocityCapInput" class="font-bold">VELOCITY CAP</Label>
		<Input id="velocityCapInput" type="number" bind:value={velocityCap} />

		<Label for="spacingInput" class="font-bold">SPACING</Label>
		<Input id="spacingInput" type="number" bind:value={spacing} on:change={handleResize} />
	</Card>
</div>

<canvas bind:this={canvas} class="h-full w-full" />
