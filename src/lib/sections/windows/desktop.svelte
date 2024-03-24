<script lang="ts">
	import { desktop } from './stores.svelte';
	import Window from './window/window.svelte';

	desktop.createWindow({ title: 'Basic window' });
</script>

{#each desktop.windows as window (window.id)}
	<Window {window} />
{/each}
