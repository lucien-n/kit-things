<script lang="ts">
	import { Cross1 } from 'radix-icons-svelte';
	import { TitlebarAction, type TitlebarProps } from '.';

	const { window }: TitlebarProps = $props();
</script>

<section class="center bg-background h-8 select-none justify-between border-b">
	<span class="text-foreground flex gap-1">
		{window.details.icon}
		<p>{window.details.title}</p>
	</span>
	<div class="flex h-8">
		<TitlebarAction onclick={() => window.close()}>
			<Cross1 />
		</TitlebarAction>
	</div>
</section>
