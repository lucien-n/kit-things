<script lang="ts">
	import { Vector } from '$lib/utils';
	import { Cross1, EnterFullScreen, ExitFullScreen } from 'radix-icons-svelte';
	import { TitlebarAction, type TitlebarProps } from '.';

	const { window }: TitlebarProps = $props();

	let node: HTMLElement | undefined;
	let clicking = false;
	let initialMousePosition: Vector | undefined;
	let lastWindowPosition: Vector | undefined;

	const handleMouseMove = (event: MouseEvent) => {
		if (!clicking || !initialMousePosition || !node) return;

		const offsetX = event.clientX - initialMousePosition.x;
		const offsetY = event.clientY - initialMousePosition.y;

		if (lastWindowPosition) window.position = lastWindowPosition.add(new Vector(offsetX, offsetY));
	};

	const handleMouseDown = (event: MouseEvent) => {
		clicking = true;
		initialMousePosition = new Vector(event.clientX, event.clientY);
		lastWindowPosition = window.position;
	};

	const handleMouseUp = () => {
		clicking = false;
		initialMousePosition = undefined;
		lastWindowPosition = window.position;
	};
</script>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	bind:this={node}
	class="center bg-background h-8 select-none justify-between border-b"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
>
	<span class="text-foreground ml-1 flex gap-1">
		{window.details.icon}
		<p>{window.details.title}</p>
	</span>
	<div class="flex h-8">
		{#if window.fullscreen}
			<TitlebarAction onclick={() => console.log('to implement')}>
				<ExitFullScreen />
			</TitlebarAction>
		{:else}
			<TitlebarAction onclick={() => window.maximise()}>
				<EnterFullScreen />
			</TitlebarAction>
		{/if}
		<TitlebarAction onclick={() => window.close()}>
			<Cross1 />
		</TitlebarAction>
	</div>
</section>
