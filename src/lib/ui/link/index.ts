import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import Link from './link.svelte';

type Props = { children: Snippet } & HTMLAnchorAttributes;

export { Link, type Props as LinkProps };
