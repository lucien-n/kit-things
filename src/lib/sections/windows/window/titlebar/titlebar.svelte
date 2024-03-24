<script lang="ts">
	import { Cross1 } from 'radix-icons-svelte';
	import type { TitlebarProps } from '.';

	const { window }: TitlebarProps = $props();
</script>

<section class="center h-8 select-none justify-between border-b">
	<span class="flex gap-1">
		{window.details.icon}
		<p>{window.details.title}</p>
	</span>
	<div class="flex h-8">
		<button
			class="center aspect-square h-full overflow-hidden transition-all duration-100 hover:bg-black/10"
			onclick={() => window.close()}
		>
			<Cross1 />
		</button>
	</div>
</section>
