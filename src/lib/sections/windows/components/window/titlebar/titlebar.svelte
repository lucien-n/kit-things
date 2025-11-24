<script lang="ts">
	import { Vector } from '$lib/vector.svelte';
	import FullscreenIcon from '@lucide/svelte/icons/fullscreen';
	import MinimizeIcon from '@lucide/svelte/icons/minimize';
	import XIcon from '@lucide/svelte/icons/x';
	import { TitlebarAction, type TitlebarProps } from '.';
	import { sdesktop } from '../..';

	const { swindow }: TitlebarProps = $props();

	let node: HTMLElement | undefined;
	let clicking = false;
	let initialMousePosition: Vector | undefined;
	let lastWindowPosition: Vector | undefined;

	const handleMouseMove = (event: MouseEvent) => {
		if (!clicking || !initialMousePosition || !node) return;

		const offsetX = event.clientX - initialMousePosition.x;
		const offsetY = event.clientY - initialMousePosition.y;

		if (lastWindowPosition) swindow.position = lastWindowPosition.add(new Vector(offsetX, offsetY));

		if (swindow.isFullscreen()) {
			console.log(event.clientX);
			swindow.previousPosition = new Vector(
				event.clientX + swindow.size.x / 2,
				event.clientY - node.getBoundingClientRect().height / 2
			);
			swindow.exitFullscreen();
		}
	};

	const handleMouseDown = (event: MouseEvent) => {
		clicking = true;
		initialMousePosition = new Vector(event.clientX, event.clientY);
		lastWindowPosition = swindow.position;
	};

	const handleMouseUp = () => {
		clicking = false;
		initialMousePosition = undefined;
		lastWindowPosition = swindow.position;
	};
</script>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	bind:this={node}
	class="bg-background relative flex h-8 items-center justify-between border-b select-none"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
>
	<div class="absolute -top-7">{swindow.position}</div>
	<span class="text-foreground ml-1 flex gap-1">
		{swindow.icon}
		<p>{swindow.title}</p>
	</span>
	<div class="flex h-8">
		{#if swindow.isFullscreen()}
			<TitlebarAction onclick={() => swindow.exitFullscreen()}>
				<MinimizeIcon />
			</TitlebarAction>
		{:else}
			<TitlebarAction onclick={() => swindow.enterFullscreen()}>
				<FullscreenIcon />
			</TitlebarAction>
		{/if}
		<TitlebarAction onclick={() => sdesktop.removeWindow(swindow.id)}>
			<XIcon />
		</TitlebarAction>
	</div>
</section>
