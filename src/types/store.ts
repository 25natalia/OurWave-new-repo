import { waves } from './waves';

export type Observer = { render: () => void } & HTMLElement;

export type appStatee = {
	idUser: waves;
};
