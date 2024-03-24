import type { Window } from './types';
import { nanoid } from 'nanoid';
import { Vector } from '../../utils';

export type WindowStore = {
	id: string;
	title: string;
	position: Vector;
	size: Vector;
	close: VoidFunction;
};

type WindowStoreInitValue = Partial<Omit<Window, 'id'>>;

export const createWindowStore = (initValue: WindowStoreInitValue): WindowStore => {
	const id = nanoid();
	const title = $state(initValue.title ?? 'Basic window');
	const position = $state<Vector>(new Vector(initValue.x, initValue.y));
	const size = $state<Vector>(new Vector(initValue.width ?? 640, initValue.height ?? 360));

	const close = () => {
		desktop.closeWindow(id);
	};

	return {
		id,
		get title() {
			return title;
		},
		get position() {
			return position;
		},
		get size() {
			return size;
		},
		close
	};
};

export type DesktopStore = {
	windows: WindowStore[];
	getWindow: (id: string) => WindowStore | undefined;
	createWindow: (values: WindowStoreInitValue) => WindowStore;
	closeWindow: (id: string) => void;
};

export const createDesktopStore = (): DesktopStore => {
	let windows = $state<WindowStore[]>([]);

	const createWindow = (values: WindowStoreInitValue): WindowStore => {
		const window = createWindowStore(values);
		windows.push(window);

		console.log(`Created new window "${window.title}"`);

		return window;
	};

	const getWindow = (id: string): WindowStore | undefined => {
		return windows.find((win) => win.id === id);
	};

	const closeWindow = (id: string): void => {
		windows = windows.filter((win) => win.id !== id);
	};

	return {
		get windows() {
			return windows;
		},
		getWindow,
		createWindow,
		closeWindow
	};
};

export const desktop = createDesktopStore();
