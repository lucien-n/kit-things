import { Swindow } from './models/window.svelte';

export type DesktopStore = {
	swindows: Swindow[];
	addWindow: (window: Swindow) => void;
	getWindow: (id: string) => Swindow | undefined;
	closeWindow: (id: string) => void;
};

export const createDesktopStore = (): DesktopStore => {
	let swindows = $state<Swindow[]>([]);

	const addWindow = (window: Swindow) => {
		swindows.push(window);
		console.log(`Added new window "${window.title}"`);
	};

	const getWindow = (id: string): Swindow | undefined => {
		return swindows.find((win) => win.id === id);
	};

	const closeWindow = (id: string): void => {
		swindows = swindows.filter((win) => win.id !== id);
	};

	return {
		get swindows() {
			return swindows;
		},
		getWindow,
		addWindow,
		closeWindow
	};
};

export const desktop = createDesktopStore();
