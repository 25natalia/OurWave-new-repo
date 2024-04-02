import styles from './card.css';

export enum Attributesss {
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
	'wave' = 'wave',
}

class Card extends HTMLElement {
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
	wave?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attributesss, null> = {
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
			wave: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attributesss, oldValue: string | any, newValue: string | any) {
		switch (propName) {
			case Attributesss.profileuid:
				this.profileuid = newValue ? Number(newValue) : undefined;
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
			<section class="name">
			<p>${this.name || 'No Username'}</p>
			</section>
			<section class="image">
			<img src="${this.image}"></img>
			</section>

			<p>"${this.wave}"</p>
			<svg>${this.unlike}</svg>
			<p>${this.cantidadlike}</p>
			<svg>${this.share}</svg>
			<p>${this.cantidadshare}</p>
			<svg>${this.comentar}</svg>
			<p>${this.cantidadcomentar}</p>
			`;
		}
		const cssCard = this.ownerDocument.createElement('style');
		cssCard.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCard);
	}
}

customElements.define('my-card', Card);
export default Card;
