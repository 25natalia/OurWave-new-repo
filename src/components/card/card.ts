import styles from './card.css';
import Firebase, { addWave } from '../../services/Firebase';
import { waves } from '../../types/waves';

const formData: Omit<waves, 'id'> = {
	wave: '',
};

export enum AttributesCard {
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
		const attrs: Record<AttributesCard, null> = {
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

	attributeChangedCallback(propName: AttributesCard, oldValue: string | any, newValue: string | any) {
		switch (propName) {
			case AttributesCard.profileuid:
				this.profileuid = newValue ? Number(newValue) : undefined;
				break;

			default:
				this[propName] = newValue;
				break;
		}
	}

	connectedCallback() {
		this.render();
		// this.restoreSavedWaves();
		this.attachEventHandlers();
	}

	attachEventHandlers() {
		const likeIcon = this.shadowRoot?.querySelector('.like') as HTMLElement;
		const unlikeIcon = this.shadowRoot?.querySelector('.unlike') as HTMLElement;

		if (likeIcon && unlikeIcon) {
			likeIcon.addEventListener('click', () => {
				likeIcon.style.display = 'none';
				unlikeIcon.style.display = 'block';
			});

			unlikeIcon.addEventListener('click', () => {
				likeIcon.style.display = 'block';
				unlikeIcon.style.display = 'none';
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<section class= "cardEntera">
			<section class= profile>
			<section class="image">
			<img src="${this.image}"></img>
			</section>
			<p class="username">${this.name || 'No Username'}</p>
			</section>

			<section class='wave'>
			<p id='wave'>${this.wave}</p>
			</section>

			<section class="interacciones">
			<section class="like_group">
			<svg id="svg" class="unlike">${this.unlike}</svg>
			<svg id="svg_like" class="like" style="display: none;">${this.like}</svg>
			<p>${this.cantidadlike}</p>
			</section>

			<sections class='share'>
			<svg id="svg">${this.share}</svg>
			<p>${this.cantidadshare}</p>
			</sections>

			<section class='comment'>
			<svg id="svg">${this.comentar}</svg>
			<p>${this.cantidadcomentar}</p>
			</section>
			</section>
			</section>`;
		}

		const cssCard = this.ownerDocument.createElement('style');
		cssCard.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCard);
	}
}

customElements.define('my-card', Card);
export default Card;
