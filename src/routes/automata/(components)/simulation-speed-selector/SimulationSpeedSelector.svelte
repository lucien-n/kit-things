<script lang="ts">
	import { buttonVariants } from '&/ui/button';
	import * as ToggleGroup from '&/ui/toggle-group';
	import { cn } from '&/utils';
	import { SimulationSpeedModifier, simulationSpeedModifiers } from '.';

	interface Props {
		onSelectedSpeedModifier: (factor: number) => void;
	}

	const { onSelectedSpeedModifier }: Props = $props();

	let selectedModifiers = $state<SimulationSpeedModifier[]>([SimulationSpeedModifier.One]);
</script>

<ToggleGroup.Root
	type="multiple"
	bind:value={
		() => selectedModifiers,
		(newModifiers) => {
			const newModifier = newModifiers[1];
			if (!newModifier) return;

			selectedModifiers = [newModifier];
			onSelectedSpeedModifier(simulationSpeedModifiers[newModifier].value);
		}
	}
>
	{#each Object.entries(simulationSpeedModifiers) as [id, modifier], idx (id)}
		<ToggleGroup.Item
			value={id}
			class={cn(
				buttonVariants(),
				'cursor-pointer',
				idx !== 0 ? 'rounded-l-none' : '',
				idx !== Object.keys(simulationSpeedModifiers).length - 1 ? 'rounded-r-none' : ''
			)}
		>
			{modifier.label}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
