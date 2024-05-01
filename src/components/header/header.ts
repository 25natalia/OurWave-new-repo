import styles from './header.css';

export enum AttributesHeader {
	'uid' = 'uid',
	'logo' = 'logo',
}

class header extends HTMLElement {
	uid?: number;
	logo?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributesHeader, null> = {
			uid: null,
			logo: null,
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
    <section class="header">
		<section class="logo">
    <img src='${this.logo}'></img>
		</section>
    </section>`;
		}
		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = styles;
		this.shadowRoot?.appendChild(cssHeader);
	}
}

export default header;
customElements.define('my-header', header);
