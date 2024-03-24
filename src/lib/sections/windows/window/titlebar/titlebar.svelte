<script lang="ts">
	import { Cross1 } from 'radix-icons-svelte';
	import type { TitlebarProps } from '.';

	const { window }: TitlebarProps = $props();
</script>

<section class="center h-8 justify-between border-b">
	<p>{window.title}</p>
	<div class="flex h-8">
		<button
			class="center aspect-square h-full overflow-hidden hover:bg-black/10"
			onclick={() => window.close()}
		>
			<Cross1 />
		</button>
	</div>
</section>
