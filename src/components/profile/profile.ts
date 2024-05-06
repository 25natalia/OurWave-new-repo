export enum AttributeProfile {
	'profile_image' = 'profile_image',
	'username' = 'username',
	'fav_song' = 'fav_song',
	'name' = 'name',
	'followers' = 'followers',
	'following' = 'following',
	'playlists' = 'playlists',
}

class Perfil extends HTMLElement {
	profile_image?: string;
	username?: string;
	fav_song?: string;
	name?: string;
	followers?: string;
	following?: string;
	playlists?: string;

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
			playlists: null,
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
		<p>${this.profile_image}</p>
    <p>${this.username}</p>
    <p>${this.name}</p>
    <p>${this.fav_song}</p>
    <p>${this.followers}</p>
    <p>${this.following}</p>
    <p>${this.playlists}</p>
    `;
		}
	}
}

export default Perfil;
customElements.define('my-perfil', Perfil);
