<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import type { WindowProps } from '.';
	import { Titlebar } from './titlebar';

	const { window }: WindowProps = $props();

	let node = $state<HTMLElement | undefined>();

	onMount(() => {
		if (!node) {
			console.warn(`node not found for window "${window.id}"`);
			return;
		}

		node.style.left = `${window.position.x}px`;
		node.style.top = `${window.position.y}px`;
		node.style.width = `${window.size.x}px`;
		node.style.height = `${window.size.y}px`;
	});
</script>

<article transition:scale class="bg-background border shadow-md" bind:this={node}>
	<Titlebar {window} />
</article>
