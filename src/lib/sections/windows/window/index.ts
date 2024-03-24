import type { WindowStore } from '../stores.svelte';
import Window from './window.svelte';

type WindowProps = {
	window: WindowStore;
};

export { Window, type WindowProps };
