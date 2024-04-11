import type { DesktopApplication } from '$windows/applications';
import Desktop from './desktop.svelte';

type DesktopIconProps = {
	application: DesktopApplication;
};

export { Desktop, type DesktopIconProps };
