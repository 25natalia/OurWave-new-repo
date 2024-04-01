import styles from './card.css';
import './interactions/interactions';
import './profile/profile';
import './waves/waves';

export enum Attributesss {
	'interactionsuid' = 'interactionsuid',
	'interactionsunlike' = 'interactionsunlike',
	'interactionslike' = 'interactionslike',
	'interactionscantidadlike' = 'interactionscantidadlike',
	'interactionsshare' = 'interactionsshare',
	'interactionscantidadshare' = 'interactionscantidadshare',
	'interactionscomentar' = 'interactionscomentar',
	'interactionscantidadcomentar' = 'interactionscantidadcomentar',
	'profileuid' = 'profileuid',
	'profilename' = 'profilename',
	'profileimage' = 'profileimage',
	'wavesuid' = 'wavesuid',
	'waveswave' = 'waveswave',
}

class Card extends HTMLElement {
	interactionsuid?: number;
	interactionsunlike?: string;
	interactionslike?: string;
	interactionscantidadlike?: string;
	interactionsshare?: string;
	interactionscantidadshare?: string;
	interactionscomentar?: string;
	interactionscantidadcomentar?: string;
	profileuid?: number;
	profilename?: string;
	profileimage?: string;
	wavesuid?: number;
	waveswave?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attributesss, null> = {
			interactionsuid: null,
			interactionsunlike: null,
			interactionslike: null,
			interactionscantidadlike: null,
			interactionsshare: null,
			interactionscantidadshare: null,
			interactionscomentar: null,
			interactionscantidadcomentar: null,
			profileuid: null,
			profilename: null,
			profileimage: null,
			wavesuid: null,
			waveswave: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attributesss, oldValue: string | any, newValue: string | any) {
		switch (propName) {
			case Attributesss.interactionsuid:
				this.interactionsuid = newValue ? Number(newValue) : undefined;
				break;

			case Attributesss.profileuid:
				this.profileuid = newValue ? Number(newValue) : undefined;
				break;

			case Attributesss.wavesuid:
				this.wavesuid = newValue ? Number(newValue) : undefined;
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
				<my-interactions
					uid="${this.interactionsuid}"
					unlike="${this.interactionsunlike}"
					like="${this.interactionslike}"
					cantidadlike="${this.interactionscantidadlike}"
					share="${this.interactionsshare}"
					cantidadshare="${this.interactionscantidadshare}"
					comentar="${this.interactionscomentar}"
					cantidadcomentar="${this.interactionscantidadcomentar}">
				</my-interactions>

				<my-profile
				uid="${this.profileuid}"
				name="${this.profilename}"
				image="${this.profileimage}">
				</my-profile>

        <my-waves
        uid="${this.wavesuid}"
        wave="${this.waveswave}">
      </my-waves>
			`;
		}
		const cssCard = this.ownerDocument.createElement('style');
		cssCard.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCard);
	}
}

customElements.define('my-card', Card);
export default Card;
