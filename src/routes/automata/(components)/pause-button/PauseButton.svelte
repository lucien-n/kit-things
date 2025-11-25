<script lang="ts">
	import { Button } from '&/ui/button';
	import * as Tooltip from '&/ui/tooltip';
	import PauseIcon from '@lucide/svelte/icons/pause';
	import PlayIcon from '@lucide/svelte/icons/play';
	import { scale } from 'svelte/transition';

	interface Props {
		isPaused: boolean;
		onclick: VoidFunction;
	}

	let { isPaused, onclick }: Props = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<Button {onclick} size="icon" class="cursor-pointer">
			{#if isPaused}
				<span in:scale={{ duration: 150 }}>
					<PlayIcon />
				</span>
			{:else}
				<span in:scale={{ duration: 150 }}>
					<PauseIcon />
				</span>
			{/if}
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="bottom">
		{isPaused ? 'Play simulation' : 'Pause simulation'}
	</Tooltip.Content>
</Tooltip.Root>
