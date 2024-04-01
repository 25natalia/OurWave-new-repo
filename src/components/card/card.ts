import styles from './card.css';
import './interactions/interactions';
import './profile/profile';
import './waves/waves';

export enum Attributesss {
	'interactionsuid' = 'interactionsuid',
	'unlike' = 'unlike',
	'like' = 'like',
	'cantidadlike' = 'cantidadlike',
	'share' = 'share',
	'cantidadshare' = 'cantidadshare',
	'comentar' = 'comentar',
	'cantidadcomentar' = 'cantidadcomentar',
	'profileuid' = 'profileuid',
	'name' = 'name',
	'image' = 'image',
	'wavesuid' = 'wavesuid',
	'wave' = 'wave',
}

class Card extends HTMLElement {
	interactionsuid?: number;
	unlike?: string;
	like?: string;
	cantidadlike?: string;
	share?: string;
	cantidadshare?: string;
	comentar?: string;
	cantidadcomentar?: string;
	profileuid?: number;
	name?: string;
	image?: string;
	wavesuid?: number;
	wave?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attributesss, null> = {
			interactionsuid: null,
			unlike: null,
			like: null,
			cantidadlike: null,
			share: null,
			cantidadshare: null,
			comentar: null,
			cantidadcomentar: null,
			profileuid: null,
			name: null,
			image: null,
			wavesuid: null,
			wave: null,
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
			<my-profile
			uid="${this.profileuid}"
			<section class="name">
			name="${this.name || 'No Username'}"
			</section>
			<section class="image">
			image="${this.image}">
			</section>
			</my-profile>

			<my-waves
			uid="${this.wavesuid}"
			wave="${this.wave}">
			</my-waves>

			<my-interactions
			uid="${this.interactionsuid}"
			unlike="${this.unlike}"
			cantidadlike="${this.cantidadlike}"
			share="${this.share}"
			cantidadshare="${this.cantidadshare}"
			comentar="${this.comentar}"
			cantidadcomentar="${this.cantidadcomentar}">
			</my-interactions>
			`;
		}
		const cssCard = this.ownerDocument.createElement('style');
		cssCard.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCard);
	}
}

customElements.define('my-card', Card);
export default Card;
