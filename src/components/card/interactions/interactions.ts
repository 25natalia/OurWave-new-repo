import styles from './interactions.css';
export enum Attribute {
	'uid' = 'uid',
	'unlike' = 'unlike',
	'like' = 'like',
	'cantidadlike' = 'cantidadlike',
	'share' = 'share',
	'cantidadshare' = 'cantidadshare',
	'comentar' = 'comentar',
	'cantidadcomentar' = 'cantidadcomentar',
}

class interactions extends HTMLElement {
	uid?: number;
	unlike?: string;
	like?: string;
	cantidadlike?: string;
	share?: string;
	cantidadshare?: string;
	comentar?: string;
	cantidadcomentar?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			uid: null,
			unlike: null,
			like: null,
			cantidadlike: null,
			share: null,
			cantidadshare: null,
			comentar: null,
			cantidadcomentar: null,
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
    <section class="interactions">

		<section class="like">
    <svg>${this.unlike}'</svg>
		<p>${this.cantidadlike}</p>
		</section>

		<section class="share">
		<svg>${this.share}'></svg>
		<p>${this.cantidadshare}</p>
		</section>

		<section class="comentar">
		<svg> src='${this.comentar}'</svg>
		<p>${this.cantidadcomentar}</p>
		</section>
    </section>`;
		}
		const cssIntercations = this.ownerDocument.createElement('style');
		cssIntercations.innerHTML = styles;
		this.shadowRoot?.appendChild(cssIntercations);
	}
}

export default interactions;
customElements.define('my-interactions', interactions);
