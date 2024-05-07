import styles from './header.css';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';

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

		const homeLogo = this.shadowRoot?.querySelector('.logo');
		homeLogo?.addEventListener('click', () => {
			dispatch(navigate('HOME'));
		});

		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = styles;
		this.shadowRoot?.appendChild(cssHeader);
	}
}

export default header;
customElements.define('my-header', header);
