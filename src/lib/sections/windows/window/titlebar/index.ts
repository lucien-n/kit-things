import type { WindowStore } from '../../stores.svelte';
import Titlebar from './titlebar.svelte';

type TitlebarProps = {
	window: WindowStore;
};

export { Titlebar, type TitlebarProps };
