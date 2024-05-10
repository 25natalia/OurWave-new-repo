import { iconos } from '../services/dataMenu';
import { Attribute } from '../components/menu/menu';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { addcontent } from '../services/dataAdd';
// import { AttributesAdd } from '../components/addWave/addwave';
import { profile } from '../services/dataProfile';
import { AttributesCard } from '../components/card/card';
import { addObserver, appState, dispatch } from '../store';
import Firebase, { addWave } from '../services/Firebase';
import { waves } from '../types/waves';

const formData: Omit<waves, 'id'> = {
	wave: '',
};

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		this.restoreSavedWaves();
	}

	submitForm() {
		const enterWaveInput = this.shadowRoot?.querySelector('.image') as HTMLInputElement;
		const waveText = enterWaveInput.value;

		formData.wave = waveText;

		console.log(formData);

		Firebase.addWave(formData);

		enterWaveInput.value = '';

		const waveDisplay = document.createElement('p');
		waveDisplay.textContent = waveText;

		if (enterWaveInput.nextSibling) {
			this.shadowRoot?.insertBefore(waveDisplay, enterWaveInput.nextSibling);
		} else {
			this.shadowRoot?.appendChild(waveDisplay);
		}

		// Guardar el contenido en el almacenamiento local
		this.saveWaveToLocalStorage(waveText);
	}

	restoreSavedWaves() {
		// Restaurar el contenido del almacenamiento local
		const savedWaves = JSON.parse(localStorage.getItem('savedWaves') || '[]');
		savedWaves.forEach((wave: string) => {
			const waveDisplay = document.createElement('p');
			waveDisplay.textContent = wave;
			if (this.shadowRoot?.firstChild) {
				this.shadowRoot.insertBefore(waveDisplay, this.shadowRoot.firstChild);
			} else {
				this.shadowRoot?.appendChild(waveDisplay);
			}
		});
	}

	saveWaveToLocalStorage(wave: string) {
		// Obtener todas las ondas almacenadas
		const savedWaves = JSON.parse(localStorage.getItem('savedWaves') || '[]');
		// Agregar la nueva onda a la lista
		savedWaves.push(wave);
		// Guardar la lista actualizada en el almacenamiento local
		localStorage.setItem('savedWaves', JSON.stringify(savedWaves));
	}

	changeWave(e: any) {
		formData.wave = e.target.value;
	}

	render() {
		if (this.shadowRoot) {
			header.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-header');
				myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
				this.shadowRoot?.appendChild(myHeader);
			});

			const enterWave = this.ownerDocument.createElement('input');
			enterWave.placeholder = 'Enter your Wave';
			enterWave.classList.add('image');
			enterWave.addEventListener('change', this.changeWave);
			this.shadowRoot.appendChild(enterWave);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Save';
			save.classList.add('save');
			save.addEventListener('click', this.submitForm.bind(this)); // Bind 'this' context
			this.shadowRoot?.appendChild(save);

			profile.forEach((element) => {
				const myCard = document.createElement('my-card');
				console.log(element);
				myCard.setAttribute(AttributesCard.name, element.name);
				myCard.setAttribute(AttributesCard.image, element.image);
				myCard.setAttribute(AttributesCard.wave, element.wave);
				myCard.setAttribute(AttributesCard.unlike, element.unlike);
				myCard.setAttribute(AttributesCard.like, element.like);
				myCard.setAttribute(AttributesCard.cantidadlike, element.cantidadlike);
				myCard.setAttribute(AttributesCard.share, element.share);
				myCard.setAttribute(AttributesCard.cantidadshare, element.cantidadshare);
				myCard.setAttribute(AttributesCard.comentar, element.comentar);
				myCard.setAttribute(AttributesCard.cantidadcomentar, element.cantidadcomentar);

				this.shadowRoot?.appendChild(myCard);
			});

			iconos.forEach((iconoData) => {
				const myIcono = document.createElement('my-iconos');
				myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
				myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
				myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
				this.shadowRoot?.appendChild(myIcono);
			});
		}
	}
}

customElements.define('app-dashboard', Dashboard);
