import styles from './header.css';

export enum Attributes {
	'uid' = 'uid',
	'logo' = 'logo',
	'perfil' = 'perfil',
}

class header extends HTMLElement {
	uid?: number;
	logo?: string;
	perfil?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attributes, null> = {
			uid: null,
			logo: null,
			perfil: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attributes, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attributes.uid:
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
    <section class="header">
    <img src='${this.logo}'></img>
    <svg id="perfil">${this.perfil}</svg>
    </section>`;
		}
		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = styles;
		this.shadowRoot?.appendChild(cssHeader);
	}
}

export default header;
customElements.define('my-header', header);
