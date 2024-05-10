import { iconos } from '../services/dataMenu';
import { Attribute } from '../components/menu/menu';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { profile } from '../services/dataProfile';
import { AttributesCard } from '../components/card/card';
import { addObserver } from '../store';
import Firebase, { addWave } from '../services/Firebase';
import { waves } from '../types/waves';
import styles from './dashboard.css';

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
	}

	render() {
		if (this.shadowRoot) {
			header.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-header');
				myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
				this.shadowRoot?.appendChild(myHeader);
			});

			const titleHome = this.ownerDocument.createElement('h1');
			titleHome.textContent = 'Share your wave!';
			this.shadowRoot?.appendChild(titleHome);

			const enterWave = this.ownerDocument.createElement('input');
			enterWave.placeholder = 'Enter your Wave';
			enterWave.classList.add('image');
			enterWave.addEventListener('change', this.changeWave);
			this.shadowRoot.appendChild(enterWave);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Share';
			save.classList.add('save');
			save.addEventListener('click', this.submitForm.bind(this));
			this.shadowRoot?.appendChild(save);

			const forYou = this.ownerDocument.createElement('h2');
			forYou.textContent = 'For You';
			this.shadowRoot?.appendChild(forYou);

			const savedWaves = JSON.parse(localStorage.getItem('savedWaves') || '[]');

			savedWaves.forEach((wave: string) => {
				profile.forEach((element) => {
					const myCard = document.createElement('my-card');
					myCard.setAttribute(AttributesCard.name, element.name);
					myCard.setAttribute(AttributesCard.image, element.image);
					myCard.setAttribute(AttributesCard.unlike, element.unlike);
					myCard.setAttribute(AttributesCard.like, element.like);
					myCard.setAttribute(AttributesCard.cantidadlike, element.cantidadlike);
					myCard.setAttribute(AttributesCard.share, element.share);
					myCard.setAttribute(AttributesCard.cantidadshare, element.cantidadshare);
					myCard.setAttribute(AttributesCard.comentar, element.comentar);
					myCard.setAttribute(AttributesCard.cantidadcomentar, element.cantidadcomentar);
					myCard.setAttribute(AttributesCard.wave, wave);
					this.shadowRoot?.appendChild(myCard);
				});
			});

			iconos.forEach((iconoData) => {
				const myIcono = document.createElement('my-iconos');
				myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
				myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
				myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
				this.shadowRoot?.appendChild(myIcono);
			});

			const cssDashboard = this.ownerDocument.createElement('style');
			cssDashboard.innerHTML = styles;
			this.shadowRoot?.appendChild(cssDashboard);
		}
	}

	restoreSavedWaves() {
		const sectionWave = this.shadowRoot?.querySelector('.wave');
		const savedWaves = JSON.parse(localStorage.getItem('savedWaves') || '[]');
		savedWaves.forEach((wave: string) => {
			const waveDisplay = document.createElement('p');
			waveDisplay.textContent = wave;
			sectionWave?.appendChild(waveDisplay);
		});
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
		this.saveWaveToLocalStorage(waveText);
	}

	saveWaveToLocalStorage(wave: string) {
		const savedWaves = JSON.parse(localStorage.getItem('savedWaves') || '[]');
		savedWaves.push(wave);
		localStorage.setItem('savedWaves', JSON.stringify(savedWaves));
	}

	changeWave(e: any) {
		formData.wave = e.target.value;
	}
}

customElements.define('app-dashboard', Dashboard);
