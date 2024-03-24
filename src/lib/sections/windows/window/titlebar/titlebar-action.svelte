<script lang="ts">
	import type { TitlebarActionProps } from '.';

	const { onclick, children }: TitlebarActionProps = $props();
</script>

<button
	class="center aspect-square h-full overflow-hidden transition-all duration-100 hover:bg-black/10"
	{onclick}
>
	{@render children()}
</button>
