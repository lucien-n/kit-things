import type { Swindow } from '../models/swindow.svelte';
import Window from './window.svelte';

type WindowProps = {
	swindow: Swindow;
};

export { Window, type WindowProps };
