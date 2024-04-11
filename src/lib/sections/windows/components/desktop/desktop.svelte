<script lang="ts">
	import { onMount } from 'svelte';
	import { Window } from '$windows/components/window';
	import { Swindow } from '$windows/models/swindow.svelte';
	import { sdesktop } from '$windows/components';
	import { Vector } from '$lib/vector.svelte';
	import { APPLICATIONS } from '$windows/applications';
	import DesktopIcon from './desktop-icon.svelte';

	onMount(() => {
		sdesktop.addWindow(new Swindow('Default window', '😎', new Vector(110, 234)));
		sdesktop.addWindow(new Swindow('Other window', '🛒', new Vector(758, 180)));

		console.log(sdesktop.swindows.map((win) => win.position.toString()));
	});
</script>

<div class="absolute left-0 top-0 h-full w-full">
	{#each APPLICATIONS as application}
		<DesktopIcon {application} />
	{/each}
</div>

{#each sdesktop.swindows as swindow (swindow.id)}
	<Window {swindow} />
{/each}
