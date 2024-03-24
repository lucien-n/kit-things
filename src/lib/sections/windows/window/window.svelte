<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import type { WindowProps } from '.';
	import { Titlebar } from './titlebar';
	import { sdesktop } from '..';

	const { window }: WindowProps = $props();

	let node = $state<HTMLElement | undefined>();

	onMount(() => {
		if (!node) {
			console.warn(`node not found for window "${window.id}"`);
			return;
		}
	});

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
	class="bg-background absolute border shadow-md"
	bind:this={node}
	onmousedown={() => sdesktop.focusWindow(window.id)}
>
	<Titlebar {window} />
</article>
