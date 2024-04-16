import type { BaseApplication } from '$windows/models/application';
import { TestApplication } from './test.svelte';
import { BlankApplication } from './blank.svelte';

type DesktopApplication = {
	label: string;
	icon: string;
	application: BaseApplication;
};

const APPLICATIONS: DesktopApplication[] = [
	{ label: 'Test', icon: '🧪', application: new TestApplication() },
	{ label: 'Blank', icon: '📝', application: new BlankApplication() }
];

export { type DesktopApplication, APPLICATIONS, TestApplication };
