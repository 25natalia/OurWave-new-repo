import styles from './header.css';

export enum AttributesHeader {
	'uid' = 'uid',
	'name' = 'name',
	'photo' = 'photo',
	'profile' = 'profile',
	'song' = 'song',
}

class friends extends HTMLElement {
	uid?: number;
	photo?: string;
	name?: string;
	profile?: string;
	song?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributesHeader, null> = {
			uid: null,
			photo: null,
			name: null,
			profile: null,
			song: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributesHeader, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case AttributesHeader.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

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
    <img src='${this.photo}'></img>
    <p>${this.name}</p>
    <img src='${this.profile}'></img>
    <h3>${this.song}</h3>`;
		}
		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = styles;
		this.shadowRoot?.appendChild(cssHeader);
	}
}

export default friends;
customElements.define('my-friend', friends);
