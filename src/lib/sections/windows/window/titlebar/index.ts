import Titlebar from './titlebar.svelte';
import TitlebarAction from './titlebar-action.svelte';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import { Swindow } from '../../models/window.svelte';

type TitlebarProps = {
	window: Swindow;
};

type TitlebarActionProps = {
	onclick: HTMLButtonAttributes['onclick'];
	children: Snippet;
};

export type { TitlebarProps, TitlebarActionProps };
export { Titlebar, TitlebarAction };
