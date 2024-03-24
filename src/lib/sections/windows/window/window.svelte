<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { WindowProps } from '.';
	import { sdesktop } from '..';
	import { Titlebar } from './titlebar';

	const { swindow }: WindowProps = $props();

	let node = $state<HTMLElement | undefined>();

	$effect(() => {
		if (!node) return;
		const { x, y } = swindow.position;
		const newX =
			x < -swindow.size.x + 8 ? 0 : x > window.innerWidth - 4 ? window.innerWidth - 8 : x;
		const newY =
			y < -swindow.size.y + 8 ? 0 : y > window.innerHeight - 4 ? window.innerHeight - 8 : y;

		node.style.left = `${newX}px`;
		node.style.top = `${newY}px`;
	});

	$effect(() => {
		if (!node) return;
		node.style.width = `${swindow.size.x <= window.innerWidth ? swindow.size.x : window.innerWidth}px`;
		node.style.height = `${swindow.size.y <= window.innerHeight ? swindow.size.y : window.innerHeight}px`;
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
	transition:scale
	class="absolute border bg-background shadow-md"
	bind:this={node}
	onmousedown={() => sdesktop.focusWindow(swindow.id)}
>
	<Titlebar {swindow} />
</article>
