<script lang="ts">
	import * as Tooltip from '&/ui/tooltip';

	const { children } = $props();
</script>

<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
