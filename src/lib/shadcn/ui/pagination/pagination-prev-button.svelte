<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import { Button } from "$lib/shadcn/ui/ui/button/index.js";
	import { cn } from "$lib/shadcn/utils.js";

	type $$Props = PaginationPrimitive.PrevButtonProps;
	type $$Events = PaginationPrimitive.PrevButtonEvents;

	interface Props {
		class?: $$Props["class"];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<PaginationPrimitive.PrevButton asChild >
	{#snippet children({ builder })}
		<Button
			variant="ghost"
			class={cn("gap-1 pl-2.5", className)}
			builders={[builder]}
			on:click
			{...rest}
		>
			{#if children}{@render children()}{:else}
				<ChevronLeft class="h-4 w-4" />
				<span>Previous</span>
			{/if}
		</Button>
	{/snippet}
</PaginationPrimitive.PrevButton>
