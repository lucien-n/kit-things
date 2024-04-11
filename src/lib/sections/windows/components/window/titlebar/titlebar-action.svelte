<script lang="ts">
	import type { TitlebarActionProps } from '.';

	const { onclick, children }: TitlebarActionProps = $props();
</script>

<button
	class="center hover:bg-primary-foreground aspect-square h-full overflow-hidden border-b transition-all duration-100"
	{onclick}
>
	{@render children()}
</button>
