import styles from './Songs.css';

export enum AttributeSongs {
	'artist' = 'artist',
	'song_title' = 'song_title',
	'image' = 'image',
	'top' = 'top',

}

class SongsComponent extends HTMLElement {
	artist?: string;
	song_title?: string;
	image?: string;
	top?: string;


	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeSongs, null> = {
			artist: null,
			song_title: null,
			image: null,
			top: null,

		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeSongs, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<section class = "card">


			<p class="top">${this.top}</p>

			<section class= "imagen">
			<img src="${this.image}" alt= "cover album"></img>
			</section>

			<section class = "letters">

			<section class = "title">
			<p>${this.song_title}</p>
			</section>

		<section class = "artist">
		<p>${this.artist}</p>
		</section>


		</section>

		</section>
    `;
		}

		const cssSongs = this.ownerDocument.createElement('style');
		cssSongs.innerHTML = styles;
		this.shadowRoot?.appendChild(cssSongs);
	}
}

export default SongsComponent;
customElements.define('my-songs', SongsComponent);
