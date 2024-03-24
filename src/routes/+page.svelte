<script lang="ts">
	import { route } from '$routes';
	import { Link } from '$ui/link';

	type Route = {
		label: string;
		href: string;
	};
	const routes: Route[] = [{ label: 'Windows', href: route('/windows') }];
</script>

<section class="center h-full">
	{#each routes as { label, href } (href)}
		<Link {href}>{label}</Link>
	{/each}
</section>
