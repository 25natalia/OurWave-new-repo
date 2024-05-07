import styles from './Songs.css';

export enum AttributeSongs {
	'artist' = 'artist',
	'song_title' = 'song_title',
	'image' = 'image',
}

class SongsComponent extends HTMLElement {
	artist?: string;
	song_title?: string;
	image?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeSongs, null> = {
			artist: null,
			song_title: null,
			image: null,
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
		<p>${this.artist}</p>
    <p>${this.song_title}</p>
		<img src="${this.image}"></img>
    `;
		}

		const cssMenu = this.ownerDocument.createElement('style');
		cssMenu.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMenu);
	}
}

export default SongsComponent;
customElements.define('my-perfil', SongsComponent);