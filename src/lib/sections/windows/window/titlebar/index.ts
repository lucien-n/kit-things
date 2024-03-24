import Titlebar from './titlebar.svelte';
import TitlebarAction from './titlebar-action.svelte';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import { Swindow } from '../../models/swindow.svelte';

type TitlebarProps = {
	swindow: Swindow;
};

type TitlebarActionProps = {
	onclick: HTMLButtonAttributes['onclick'];
	children: Snippet;
};

export type { TitlebarProps, TitlebarActionProps };
export { Titlebar, TitlebarAction };
