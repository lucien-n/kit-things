<script lang="ts">
	import * as Select from '&/ui/select';
	import { type AutomataRule, automataRuleSpecs } from '../../(specs)';

	interface Props {
		rule: AutomataRule;
	}
	let { rule = $bindable() }: Props = $props();
</script>

<Select.Root type="single" bind:value={rule}>
	<Select.Trigger>{automataRuleSpecs[rule].label}</Select.Trigger>
	<Select.Content>
		{#each Object.values(automataRuleSpecs) as spec (spec.id)}
			<Select.Item value={spec.id}>{spec.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
