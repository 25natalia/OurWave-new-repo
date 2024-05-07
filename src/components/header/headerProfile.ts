import styles from './header.css';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';

export enum AttributesHeaderProfile {
	'uid' = 'uid',
	'logo' = 'logo',
	'log_out' = 'log_out',
}

class headerProfile extends HTMLElement {
	uid?: number;
	logo?: string;
	log_out?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributesHeaderProfile, null> = {
			uid: null,
			logo: null,
			log_out: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(
		propName: AttributesHeaderProfile,
		oldValue: string | undefined,
		newValue: string | undefined
	) {
		switch (propName) {
			case AttributesHeaderProfile.uid:
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

		<svg class="log_out" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#1e1e1e" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
    </section>`;
		}

		const homeLogo = this.shadowRoot?.querySelector('.logo');
		homeLogo?.addEventListener('click', () => {
			dispatch(navigate('HOME'));
		});

		const logOut = this.shadowRoot?.querySelector('.log_out');
		logOut?.addEventListener('click', () => {
			dispatch(navigate('REGISTER'));
		});

		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = styles;
		this.shadowRoot?.appendChild(cssHeader);
	}
}

export default headerProfile;
customElements.define('my-headerprofile', headerProfile);
