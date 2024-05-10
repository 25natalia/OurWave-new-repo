// import styles from './add.css';
// import { addWave } from '../../services/Firebase';
// import { waves } from '../../types/waves';
// import Firebase from '../../services/Firebase';

// const formData: Omit<waves, 'id'> = {
// 	wave:''
// };

// export enum AttributesAdd {
// 	'uid' = 'uid',
// 	'iconoadd' = 'iconoadd',
// }

// class AddContent extends HTMLElement {
// 	uid?: number;
// 	iconoadd?: string;

// 	static get observedAttributes() {
// 		return ['uid', 'iconoadd'];
// 	}

// 	attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null) {
// 		if (newValue !== oldValue) {
// 			switch (attrName) {
// 				case 'uid':
// 					this.uid = newValue ? Number(newValue) : undefined;
// 					break;
// 				case 'iconoadd':
// 					this.iconoadd = newValue || undefined;
// 					break;
// 			}
// 		}
// 	}

// 	constructor() {
// 		super();
// 		this.attachShadow({ mode: 'open' });
// 	}

// connectedCallback() {
// 		this.render();
// 	}

// 	submitForm() {
// 		console.log(formData);
// 		Firebase.addWave(formData);
// 	}

// 	changeWave(e:any){
// 		formData.wave = e.target.value;
// 	}

// 	render() {
// 		if (this.shadowRoot) {
// 			this.shadowRoot.innerHTML = `
// 			<section class="boton">
// 				<button id="ButtonPost">
// 				<svg id="iconoadd">${this.iconoadd}</svg>
// 				</button>
// 			/section>
// 			<section class="modalContainer" style="display:none;">
// 				<form class="my-wave">
// 				<span class="close">X</span>
// 				<h2>Share your wave</h2>
// 				<textarea id="descriptionWave" name="wave"></textarea>
// 				<button class="post" type="submit">Enviar</button>
// 				</form>
// 			</section>
// 					`;

// 			const modal = this.shadowRoot.querySelector('.modalContainer') as HTMLDivElement;
// 			const button = this.shadowRoot.querySelector('#ButtonPost') as HTMLButtonElement;
// 			const span = this.shadowRoot.querySelector('.close') as HTMLSpanElement;
// 			const textArea = this.shadowRoot.querySelector('#descriptionWave') as HTMLTextAreaElement;


// 			textArea.addEventListener('change', this.changeWave);

// 			button.addEventListener('click', () => {
// 				modal.style.display = 'block';
// 			});

// 			span.addEventListener('click', () => {
// 				modal.style.display = 'none';
// 			});

// 			window.addEventListener('click', (event) => {
// 				if (event.target == modal) {
// 					modal.style.display = 'none';
// 				}
// 			});
// 			const form = this.shadowRoot.querySelector('.my-wave') as HTMLFormElement;
// 			form.addEventListener('submit', (event) => {
// 				event.preventDefault();
// 				const textArea = this.shadowRoot?.querySelector('#descriptionWave') as HTMLTextAreaElement;
// 				const waveText = textArea.value;
// 				console.log('Entered wave:', waveText);
// 				textArea.value = '';
// 				modal.style.display = 'none';
// 			});

// 			const artist = this.ownerDocument.createElement('input');
// 			artist.placeholder = 'Add an artist';
// 			artist.classList.add('artist');
// 			artist.addEventListener('change', this.changeWave);
// 			section.appendChild(artist);

// 			const save = this.ownerDocument.createElement('button');
// 			save.innerText = 'Save';
// 			save.classList.add('save');
// 			save.addEventListener('click', this.submitForm);
// 			this.shadowRoot?.appendChild(save);

// 		const cssAdd = this.ownerDocument.createElement('style');
// 		cssAdd.innerHTML = styles;
// 		this.shadowRoot?.appendChild(cssAdd);
// 	}
// }}

// export default AddContent;
// customElements.define('my-addcontent', AddContent);
