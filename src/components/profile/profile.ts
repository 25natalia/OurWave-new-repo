export enum AttributeProfile {
	'profile_image' = 'profile_image',
	'username' = 'username',
	'fav_song' = 'fav_song',
	'name' = 'name',
	'followers' = 'followers',
	'following' = 'following',
}

class Perfil extends HTMLElement {
	profile_image?: string;
	username?: string;
	fav_song?: string;
	name?: string;
	followers?: string;
	following?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeProfile, null> = {
			profile_image: null,
			username: null,
			fav_song: null,
			name: null,
			followers: null,
			following: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeProfile, oldValue: string | undefined, newValue: string | undefined) {
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
    <img src="${this.profile_image}"></img>
    <p>${this.username}</p>
    <p>${this.name}</p>
    <p><svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M15 11.586V6h2V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2h2v5.586l-2.707 1.707A.996.996 0 0 0 6 14v2a1 1 0 0 0 1 1h4v3l1 2 1-2v-3h4a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L15 11.586z"></path></svg></svg>
		${this.fav_song}</p>
    <p>${this.followers}</p>
    <p>${this.following}</p>
    <Button>Playlists</Button>
    `;
		}
	}
}

export default Perfil;
customElements.define('my-perfil', Perfil);
