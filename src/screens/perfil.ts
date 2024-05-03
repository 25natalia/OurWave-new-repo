import { AttributePerfil } from '../components/perfil/perfil';
import { getSongs } from '../services/Firebase';

export class Perfil extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	async render() {
		if (this.shadowRoot) {
			const dataSongs = await getSongs();
			dataSongs.forEach((song: any) => {
				const mySong = document.createElement('my-perfil');
				mySong.setAttribute(AttributePerfil.song_title, song.song_title);
				this.shadowRoot?.appendChild(mySong);
			});
		}
	}
}
customElements.define('app-perfil', Perfil);
