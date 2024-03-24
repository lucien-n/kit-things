<script lang="ts">
	import { Vector } from '$lib/vector.svelte';
	import { Cross1, EnterFullScreen, ExitFullScreen } from 'radix-icons-svelte';
	import { TitlebarAction, type TitlebarProps } from '.';
	import { desktop } from '../../stores.svelte';

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
			window.exitFullscreen(); // todo: fix window being reset to last position and so needing to readjust mouse pos after
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
	class="center bg-background h-8 select-none justify-between border-b"
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
>
	<span class="text-foreground ml-1 flex gap-1">
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
		<TitlebarAction onclick={() => desktop.closeWindow(window.id)}>
			<Cross1 />
		</TitlebarAction>
	</div>
</section>
