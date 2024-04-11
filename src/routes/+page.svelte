<script lang="ts">
	import { route } from '$routes';
	import { Link } from '$ui/link';

	type Route = {
		label: string;
		href: string;
	};
	const routes: Route[] = [
		{ label: 'Windows', href: route('/windows') },
		{ label: 'Dots', href: route('/dots') }
	];
</script>

<section class="center flex h-full flex-col space-y-3">
	{#each routes as { label, href } (href)}
		<Link {href}>{label}</Link>
	{/each}
</section>
