<script lang="ts">
	import { onMount } from 'svelte';

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

	const velocity = 5 / 1000;
	let prevTime = 0;
	let dt = $state(0);

	let maxDistanceFromStart = $state(10);
	let clear = $state(true);

	const now = () => new Date().getTime();

	const generateDots = (): Dot[] => {
		const dots: Dot[] = [];
		const spacing = 50;

		for (let y = 0; y < height / spacing; y++) {
			for (let x = 0; x < width / spacing; x++) {
				dots.push({
					x: x * spacing,
					y: y * spacing,
					velX: 0,
					velY: 0,
					startX: x * spacing,
					startY: y * spacing
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

		dt = now() - prevTime;
		prevTime = now();

		for (const dot of dots) {
			const vel = velocity * dt;
			dot.velY += Math.round(Math.random()) ? -vel : vel;
			dot.velX += Math.round(Math.random()) ? -vel : vel;

			if (dot.velY > 0.5) dot.velY = 0.5;
			if (dot.velY < -0.5) dot.velY = -0.5;
			if (dot.velX > 0.5) dot.velX = 0.5;
			if (dot.velX < -0.5) dot.velX = -0.5;

			if (dot.x < 0 || dot.x > width) {
				dot.velX = -dot.velX;
			} else {
				const offsetX = dot.x - dot.startX;
				if (offsetX > maxDistanceFromStart || offsetX < -maxDistanceFromStart) dot.velX = -dot.velX;
			}

			if (dot.y < 0 || dot.y > width) {
				dot.velY = -dot.velY;
			} else {
				const offsetY = dot.y - dot.startY;
				if (offsetY > maxDistanceFromStart || offsetY < -maxDistanceFromStart) dot.velY = -dot.velY;
			}

			dot.x += dot.velX;
			dot.y += dot.velY;
		}

		ctx.strokeStyle = 'black';
		for (const dot of dots) {
			ctx.fillRect(dot.x, dot.y, 3, 3);
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
	<div class="bg-neutral-600 bg-opacity-80 px-3 py-2 text-white">
		<p><strong>DT</strong> {dt}</p>
		<section>
			<label for="clearCB">
				<strong>CLEAR</strong>
			</label>
			<input type="checkbox" name="clear" id="clearCB" bind:checked={clear} />
		</section>
		<section>
			<label for="maxDistanceINP">
				<strong>MAX DISTANCE</strong>
			</label>
			<input
				type="number"
				name="maxDistance"
				id="maxDistanceINP"
				min="0"
				max="500"
				class="text-black"
				bind:value={maxDistanceFromStart}
			/>
		</section>
	</div>
</div>

<canvas bind:this={canvas} class="h-full w-full" />
