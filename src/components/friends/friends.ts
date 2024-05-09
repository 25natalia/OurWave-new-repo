import styles from './friends.css';
export enum AttributesFriends {
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
		const attrs: Record<AttributesFriends, null> = {
			uid: null,
			photo: null,
			name: null,
			profile: null,
			song: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributesFriends, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case AttributesFriends.uid:
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

		<section class="card" style="background-image: url('${this.photo}');background-position-x: center;background-size: cover;">
		<section class="todo">
		<section class= "image">
		<img src='${this.profile}'></img>
    <p>${this.name}</p>
		</section>
		<section class="song">
    <h3>${this.song}</h3>
		</section>
		</section>
		</section>
		`;
		}

		const cssFriends = this.ownerDocument.createElement('style');
		cssFriends.innerHTML = styles;
		this.shadowRoot?.appendChild(cssFriends);
	}
}

export default friends;
customElements.define('my-friend', friends);
