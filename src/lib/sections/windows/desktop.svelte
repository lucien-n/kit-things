<script lang="ts">
	import { onMount } from 'svelte';
	import Window from './window/window.svelte';
	import { Swindow } from './models/swindow.svelte';
	import { sdesktop } from '.';

	onMount(() => {
		const defaultWindow = new Swindow('Default window', '😎');
		sdesktop.addWindow(defaultWindow);

		const otherWindow = new Swindow('Other window', '🛒');
		sdesktop.addWindow(otherWindow);
	});
</script>

{#each sdesktop.swindows as swindow (swindow.id)}
	<Window {swindow} />
{/each}
