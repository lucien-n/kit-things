<script lang="ts">
	import { Vector } from '$lib/vector.svelte';
	import { Swindow } from '$windows/models/swindow.svelte';
	import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
	import type { DesktopIconProps } from '.';
	import { sdesktop } from '..';

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
	class="hover:bg-foreground/10 flex h-24 w-20 flex-col items-center transition-all duration-150 select-none hover:cursor-pointer"
	ondblclick={launchApplication}
>
	<span class="my-auto">
		<LayoutDashboardIcon size={48} />
	</span>
	<p class="mt-auto mb-1 text-center">{application.label}</p>
</button>
