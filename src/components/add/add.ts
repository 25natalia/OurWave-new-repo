import styles from './add.css';

export enum AttributesAdd {
	'uid' = 'uid',
	'iconoadd' = 'iconoadd',
}

class AddContent extends HTMLElement {
	uid?: number;
	iconoadd?: string;

	static get observedAttributes() {
		return ['uid', 'iconoadd'];
	}

	attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null) {
		if (newValue !== oldValue) {
			switch (attrName) {
				case 'uid':
					this.uid = newValue ? Number(newValue) : undefined;
					break;
				case 'iconoadd':
					this.iconoadd = newValue || undefined;
					break;
			}
			this.render();
		}
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<section class="boton">
				<button id="ButtonPost">
				<svg id="iconoadd">${this.iconoadd}</svg>
				</button>
			/section>
			<section class="modalContainer" style="display:none;">
				<form class="my-wave">
				<span class="close">X</span>
				<h2>Share your wave</h2>
				<textarea id="descriptionWave" name="wave"></textarea>
				<button class="enviar" type="submit">Enviar</button>
				</form>
			</section>
					`;

			const modal = this.shadowRoot.querySelector('.modalContainer') as HTMLDivElement;
			const button = this.shadowRoot.querySelector('#ButtonPost') as HTMLButtonElement;
			const span = this.shadowRoot.querySelector('.close') as HTMLSpanElement;

			button.addEventListener('click', () => {
				modal.style.display = 'block';
			});

			span.addEventListener('click', () => {
				modal.style.display = 'none';
			});

			window.addEventListener('click', (event) => {
				if (event.target == modal) {
					modal.style.display = 'none';
				}
			});

			const form = this.shadowRoot.querySelector('.my-wave') as HTMLFormElement;
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				const textArea = this.shadowRoot?.querySelector('#descriptionWave') as HTMLTextAreaElement;
				const waveText = textArea.value;
				console.log('Entered wave:', waveText);
				textArea.value = '';
				modal.style.display = 'none';
			});
		}

		const cssAdd = this.ownerDocument.createElement('style');
		cssAdd.innerHTML = styles;
		this.shadowRoot?.appendChild(cssAdd);
	}
}

export default AddContent;
customElements.define('my-addcontent', AddContent);
