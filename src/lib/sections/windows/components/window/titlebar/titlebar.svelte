<script lang="ts">
	import { Vector } from '$lib/vector.svelte';
	import { Cross1, EnterFullScreen, ExitFullScreen } from 'radix-icons-svelte';
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	bind:this={node}
	class="relative flex h-8 select-none items-center justify-between border-b bg-background"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
>
	<div class="absolute -top-7">{swindow.position}</div>
	<span class="ml-1 flex gap-1 text-foreground">
		{swindow.icon}
		<p>{swindow.title}</p>
	</span>
	<div class="flex h-8">
		{#if swindow.isFullscreen()}
			<TitlebarAction onclick={() => swindow.exitFullscreen()}>
				<ExitFullScreen />
			</TitlebarAction>
		{:else}
			<TitlebarAction onclick={() => swindow.enterFullscreen()}>
				<EnterFullScreen />
			</TitlebarAction>
		{/if}
		<TitlebarAction onclick={() => sdesktop.removeWindow(swindow.id)}>
			<Cross1 />
		</TitlebarAction>
	</div>
</section>
