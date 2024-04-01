export enum Attribute {
	'uid' = 'uid',
	'name' = 'name',
	'image' = 'image',
}

class profile extends HTMLElement {
	uid?: number;
	name?: string;
	image?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			uid: null,
			name: null,
			image: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.uid:
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
    <section>
    <img src='${this.image}'></img>
    <p>${this.name}</p>
    </section>`;
		}
	}
}

export default profile;
customElements.define('my-profile', profile);
