<script lang="ts">
	import { Dashboard } from 'radix-icons-svelte';
	import type { DesktopIconProps } from '.';
	import { sdesktop } from '..';
	import { Swindow } from '$windows/models/swindow.svelte';
	import { Vector } from '$lib/vector.svelte';

	const { application }: DesktopIconProps = $props();

	const launchApplication = () => {
		console.log(`Starting "${application.label}"`);
		sdesktop.addWindow(
			new Swindow({
				title: application.label,
				icon: application.icon,
				position: new Vector(110, 234),
				application: application.application
			})
		);
	};
</script>

<button
	class="flex h-24 w-20 select-none flex-col items-center transition-all duration-150 hover:cursor-pointer hover:bg-foreground/10"
	ondblclick={launchApplication}
>
	<span class="my-auto">
		<Dashboard size={48} />
	</span>
	<p class="mb-1 mt-auto text-center">{application.label}</p>
</button>
