import styles from './menu.css';

export enum Attribute {
	'uid' = 'uid',
	'iconohome' = 'iconohome',
	'iconoexplore' = 'iconoexplore',
	'iconochats' = 'iconochats',
	'iconoprofile' = 'iconoprofile',
}

class iconos extends HTMLElement {
	uid?: number;
	iconohome?: string;
	iconoexplore?: string;
	iconochats?: string;
	iconoprofile?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			uid: null,
			iconohome: null,
			iconoexplore: null,
			iconochats: null,
			iconoprofile: null,
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
			<section class="menubar">
		<svg id="home">${this.iconohome}</svg>
		<svg id="explore">${this.iconoexplore}</svg>
		<svg id="chats">${this.iconochats}</svg>
		<svg id="profile">${this.iconoprofile}</svg>
			</section>`;
		}

		const cssMenu = this.ownerDocument.createElement('style');
		cssMenu.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMenu);
	}
}

export default iconos;
customElements.define('my-iconos', iconos);
