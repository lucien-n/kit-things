<script lang="ts">
	import { onMount } from 'svelte';
	import { Window } from '$windows/components/window';
	import { Swindow } from '$windows/models/swindow.svelte';
	import { sdesktop } from '$windows/components';
	import { Vector } from '$lib/vector.svelte';
	import { APPLICATIONS } from '$windows/applications';
	import DesktopIcon from './desktop-icon.svelte';
	import { BlankApplication } from '$windows/applications/blank.svelte';

	onMount(() => {
		sdesktop.addWindow(
			new Swindow({
				title: 'Default window',
				icon: '😎',
				position: new Vector(110, 234),
				application: new BlankApplication()
			})
		);
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
