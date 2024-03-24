<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { WindowProps } from '.';
	import { sdesktop } from '..';
	import { Titlebar } from './titlebar';

	const { swindow: swindow }: WindowProps = $props();

	let node = $state<HTMLElement | undefined>();

	$effect(() => {
		if (!node) return;
		node.style.left = `${swindow.position.x}px`;
		node.style.top = `${swindow.position.y}px`;
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
	<Titlebar window={swindow} />
</article>
