<script lang="ts">
	import { cn } from '$ui/cn';
	import type { LinkProps as Props } from '.';

	const { href, class: className, children, ...props }: Props = $props();
</script>

<a {href} class={cn('font-semibold underline-offset-4 hover:underline', className)} {...props}>
	{@render children()}
</a>
