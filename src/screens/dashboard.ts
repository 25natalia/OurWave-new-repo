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
import { getUser } from '../services/Firebase';
import { appState } from '../store';

const formData: Omit<waves, 'id'> = {
	wave: '',
};

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataUser = await getUser(appState.userId);
		this.render(dataUser);
	}

	changeWave(e: any) {
		formData.wave = e.target.value;
	}

	submitForm() {
		Firebase.addWave(formData);
	}

	async render(dataUser: any) {
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

			profile.forEach((element) => {
				const myCard = document.createElement('my-card');
				myCard.setAttribute(AttributesCard.name, dataUser.username);
				myCard.setAttribute(
					AttributesCard.image,
					dataUser.profile_image ||
						'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
				);
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

			const cssDashboard = this.ownerDocument.createElement('style');
			cssDashboard.innerHTML = styles;
			this.shadowRoot?.appendChild(cssDashboard);
		}
	}
}
customElements.define('app-dashboard', Dashboard);
