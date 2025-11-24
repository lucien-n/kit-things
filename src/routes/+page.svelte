<script lang="ts">
	import { Link } from '$lib/ui/link';
	import { route } from '$routes';

	type Route = {
		label: string;
		href: string;
	};
	const routes: Route[] = [
		{ label: 'Windows', href: route('/windows') },
		{ label: 'Dots', href: route('/dots') },
		{ label: 'Quack', href: route('/quack') }
	];
</script>

<section class="flex h-full flex-col items-center justify-center space-y-3">
	{#each routes as { label, href } (href)}
		<Link {href}>{label}</Link>
	{/each}
</section>
