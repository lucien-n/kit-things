import type { Window } from './types';
import { nanoid } from 'nanoid';
import { Vector } from '../../utils';

type WindowDetails = { icon: string; title: string };

export type WindowStore = {
	id: string;
	details: WindowDetails;
	position: Vector;
	size: Vector;
	close: VoidFunction;
};

type WindowStoreInitValue = Partial<Omit<Window, 'id'>>;

export const createWindowStore = ({
	icon,
	title,
	x = 0,
	y = 0,
	width = 640,
	height = 360
}: WindowStoreInitValue): WindowStore => {
	const id = nanoid();
	const details = $state<WindowDetails>({ icon: icon ?? '❓', title: title ?? 'Generic window' });
	const position = $state<Vector>(new Vector(x, y));
	const size = $state<Vector>(new Vector(width ?? 640, height ?? 360));

	const close = () => {
		desktop.closeWindow(id);
	};

	return {
		id,
		get details() {
			return details;
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

		console.log(`Created new window "${window.details.title}"`);

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
