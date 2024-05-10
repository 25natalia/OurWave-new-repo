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
	waves: string[] = []; // Array para almacenar todas las olas ingresadas

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			// Render initial content
			header.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-header');
				myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
				this.shadowRoot?.appendChild(myHeader);
			});

			// Render input field
			const enterWave = this.ownerDocument.createElement('input');
			enterWave.placeholder = 'Enter your Wave';
			enterWave.classList.add('image');
			this.shadowRoot.appendChild(enterWave);

			// Render save button
			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Save';
			save.classList.add('save');
			save.addEventListener('click', this.submitForm.bind(this)); // Bind 'this' context
			this.shadowRoot?.appendChild(save);

			// Render todas las olas previamente guardadas al cargar la página
			const savedWaves = localStorage.getItem('savedWaves');
			if (savedWaves) {
				this.waves = JSON.parse(savedWaves);
				this.waves.forEach((wave) => {
					this.renderWave(wave);
				});
			}

			// Render profile cards
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
		}
	}

	submitForm() {
		// Get the value of the input field
		const enterWaveInput = this.shadowRoot?.querySelector('.image') as HTMLInputElement;
		const waveText = enterWaveInput.value;

		// Agregar la ola al array y al almacenamiento local al principio
		this.waves.unshift(waveText); // Agregar al principio del array
		localStorage.setItem('savedWaves', JSON.stringify(this.waves));

		// Set the value of the input field in the formData
		formData.wave = waveText;

		// Log formData
		console.log(formData);

		// Call addWave method with formData
		Firebase.addWave(formData);

		// Render the entered wave text below other content
		this.renderWave(waveText);

		// Clear the input field
		enterWaveInput.value = '';
	}

	renderWave(waveText: string) {
		const waveDisplay = document.createElement('p');
		waveDisplay.textContent = waveText;
		// Obtener el botón de guardar
		const saveButton = this.shadowRoot?.querySelector('.save') as HTMLButtonElement;
		// Insertar la nueva ola justo antes del botón de guardar
		this.shadowRoot?.insertBefore(waveDisplay, saveButton.nextSibling);
	}
}

customElements.define('app-dashboard', Dashboard);
