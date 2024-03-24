<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { WindowProps } from '.';
	import { sdesktop } from '..';
	import { Titlebar } from './titlebar';

	const { window }: WindowProps = $props();

	let node = $state<HTMLElement | undefined>();

	$effect(() => {
		if (!node) return;
		node.style.left = `${window.position.x}px`;
		node.style.top = `${window.position.y}px`;
	});

	$effect(() => {
		if (!node) return;
		node.style.width = `${window.size.x}px`;
		node.style.height = `${window.size.y}px`;
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
	transition:scale
	class="absolute border bg-background shadow-md"
	bind:this={node}
	onmousedown={() => sdesktop.focusWindow(window.id)}
>
	<Titlebar {window} />
</article>
