<script lang="ts">
	import { Vector } from '$lib/vector.svelte';
	import { Cross1, EnterFullScreen, ExitFullScreen } from 'radix-icons-svelte';
	import { TitlebarAction, type TitlebarProps } from '.';
	import { sdesktop } from '../..';

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

		if (window.isFullscreen()) {
			console.log(event.clientX);
			window.previousPosition = new Vector(
				event.clientX + window.size.x / 2,
				event.clientY - node.getBoundingClientRect().height / 2
			);
			window.exitFullscreen();
		}
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
	class="center relative h-8 select-none justify-between border-b bg-background"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
>
	<div class="absolute -top-7">{window.position}</div>
	<span class="ml-1 flex gap-1 text-foreground">
		{window.icon}
		<p>{window.title}</p>
	</span>
	<div class="flex h-8">
		{#if window.isFullscreen()}
			<TitlebarAction onclick={() => window.exitFullscreen()}>
				<ExitFullScreen />
			</TitlebarAction>
		{:else}
			<TitlebarAction onclick={() => window.enterFullscreen()}>
				<EnterFullScreen />
			</TitlebarAction>
		{/if}
		<TitlebarAction onclick={() => sdesktop.removeWindow(window.id)}>
			<Cross1 />
		</TitlebarAction>
	</div>
</section>
