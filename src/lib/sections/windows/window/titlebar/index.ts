import type { WindowStore } from '../../stores.svelte';
import Titlebar from './titlebar.svelte';
import TitlebarAction from './titlebar-action.svelte';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

type TitlebarProps = {
	window: WindowStore;
};

type TitlebarActionProps = {
	onclick: HTMLButtonAttributes['onclick'];
	children: Snippet;
};

export type { TitlebarProps, TitlebarActionProps };
export { Titlebar, TitlebarAction };
