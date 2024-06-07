import styles from './card.css';
import Firebase from '../../services/Firebase';
import { waves } from '../../types/waves';
import { appState, dispatch, addObserver } from '../../store';
import { getPostListener } from '../../services/Firebase';
import { getUser } from '../../services/Firebase';

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

	async connectedCallback() {
		const dataUser = await getUser(appState.userId);
		this.render(dataUser);
	}

	async render(dataUser: any) {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const cssCard = this.ownerDocument.createElement('style');
			cssCard.innerHTML = styles;
			this.shadowRoot?.appendChild(cssCard);

			const postList = this.ownerDocument.createElement('section');
			this.shadowRoot?.appendChild(postList);

			const sectionCardEntera = document.createElement('section');
			sectionCardEntera.className = 'cardEntera';

			const sectionProfile = document.createElement('section');
			sectionProfile.className = 'profile';

			const sectionImage = document.createElement('section');
			sectionImage.className = 'image';

			const img = document.createElement('img');
			img.src = this.image || 'undefined';
			sectionImage.appendChild(img);

			const pUsername = document.createElement('p');
			pUsername.className = 'username';
			pUsername.textContent = this.name || 'No Username';

			sectionProfile.appendChild(sectionImage);
			sectionProfile.appendChild(pUsername);

			const sectionWave = document.createElement('section');
			sectionWave.className = 'wave';

			const newWave = this.ownerDocument.createElement('p');
			newWave.innerText = this.wave || 'undefined';
			sectionWave.appendChild(newWave);

			const sectionInteracciones = document.createElement('section');
			sectionInteracciones.className = 'interacciones';

			const sectionLikeGroup = document.createElement('section');
			sectionLikeGroup.className = 'like_group';

			const svgUnlike = document.createElement('svg');
			svgUnlike.id = 'svg';
			svgUnlike.className = 'unlike';
			svgUnlike.innerHTML = this.unlike || 'undefined';

			const svgLike = document.createElement('svg');
			svgLike.id = 'svg_like';
			svgLike.className = 'like';
			svgLike.style.display = 'none';
			svgLike.innerHTML = this.like || 'undefined';

			const pCantidadLike = document.createElement('p');
			pCantidadLike.textContent = this.cantidadlike || 'undefined';

			sectionLikeGroup.appendChild(svgUnlike);
			sectionLikeGroup.appendChild(svgLike);
			sectionLikeGroup.appendChild(pCantidadLike);

			const sectionShare = document.createElement('section');
			sectionShare.className = 'share';

			const svgShare = document.createElement('svg');
			svgShare.id = 'svg';
			svgShare.innerHTML = this.share || 'undefined';

			const pCantidadShare = document.createElement('p');
			pCantidadShare.textContent = this.cantidadshare || 'undefined';

			sectionShare.appendChild(svgShare);
			sectionShare.appendChild(pCantidadShare);

			const sectionComment = document.createElement('section');
			sectionComment.className = 'comment';

			const svgComment = document.createElement('svg');
			svgComment.id = 'svg';
			svgComment.innerHTML = this.comentar || 'undefined';

			const pCantidadComment = document.createElement('p');
			pCantidadComment.textContent = this.cantidadcomentar || 'undefined';

			sectionComment.appendChild(svgComment);
			sectionComment.appendChild(pCantidadComment);

			sectionInteracciones.appendChild(sectionLikeGroup);
			sectionInteracciones.appendChild(sectionShare);
			sectionInteracciones.appendChild(sectionComment);

			sectionCardEntera.appendChild(sectionProfile);
			sectionCardEntera.appendChild(sectionWave);
			sectionCardEntera.appendChild(sectionInteracciones);
			postList.prepend(sectionCardEntera);
		}
	}
}

customElements.define('my-card', Card);
export default Card;
