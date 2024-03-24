<script lang="ts">
	import { onMount } from 'svelte';
	import { desktop } from './stores.svelte';
	import Window from './window/window.svelte';
	import { Swindow } from './models/window.svelte';

	onMount(() => {
		const defaultWindow = new Swindow('Default window', '😎');
		desktop.addWindow(defaultWindow);
	});
</script>

{#each desktop.swindows as window (window.id)}
	<Window {window} />
{/each}
