<script lang="ts">
	import { onMount } from 'svelte';
	import Window from './window/window.svelte';
	import { Swindow } from './models/swindow.svelte';
	import { sdesktop } from '.';

	onMount(() => {
		const defaultWindow = new Swindow('Default window', '😎');
		sdesktop.addWindow(defaultWindow);
	});
</script>

{#each sdesktop.swindows as window (window.id)}
	<Window {window} />
{/each}
