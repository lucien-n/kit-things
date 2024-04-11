import type { BaseApplication } from '$windows/models/application';
import { TestApplication } from './test.svelte';

type DesktopApplication = {
	label: string;
	icon: string;
	application: BaseApplication;
};

const APPLICATIONS: DesktopApplication[] = [
	{ label: 'Test', icon: '🧪', application: new TestApplication() }
];

export { type DesktopApplication, APPLICATIONS, TestApplication };
