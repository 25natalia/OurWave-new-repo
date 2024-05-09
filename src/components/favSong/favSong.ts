import styles from './favSong.css';

export enum AttributefavSong {
	'fav_song' = 'fav_song',
}

class favSong extends HTMLElement {
	fav_song?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributefavSong, null> = {
			fav_song: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributefavSong, oldValue: string | undefined, newValue: string | undefined) {
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
		<p class="fav_song"><svg class="pin"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(46, 196, 182);transform: ;msFilter:;"><path d="M15 11.586V6h2V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2h2v5.586l-2.707 1.707A.996.996 0 0 0 6 14v2a1 1 0 0 0 1 1h4v3l1 2 1-2v-3h4a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L15 11.586z"></path></svg></svg>
		${this.fav_song}</p>
    `;
		}

		const cssProfile = this.ownerDocument.createElement('style');
		cssProfile.innerHTML = styles;
		this.shadowRoot?.appendChild(cssProfile);
	}
}

export default favSong;
customElements.define('my-favSong', favSong);
