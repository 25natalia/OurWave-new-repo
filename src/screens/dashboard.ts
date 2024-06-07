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
import { appState, dispatch } from '../store';
import { getWaves } from '../store/actions';
import { card } from '../components/indexpadre';
import { AttributeProfile } from '../components/profile/profile';
import { getMyUserWave } from '../store/actions';

const formData = {
	wave: '',
	idUser:'',
};


export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataUser = await getUser(appState.userId);
		//if (appState.userWaves.length === 0) {
			//const action = await getMyUserWave(appState.userId);
		if (appState.waves.length === 0) {
			const action = await getWaves();
			dispatch(action);
		} else {
			this.render(dataUser);
		}

	}


	changeWave(e: any) {
		formData.wave = e.target.value;
	}

	submitForm() {
		formData.idUser = appState.userId;
		Firebase.addWave(formData);
	}

	render(dataUser: any) {
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
		}



		//appState.userWaves.forEach((element: waves) => {
		appState.waves.forEach((element: waves) => {
			const username = this.ownerDocument.createElement('p');
			username.innerText = dataUser.username;
			this.shadowRoot?.appendChild(username);

			const id = this.ownerDocument.createElement('p');
			id.innerText = element.idUser;
			this.shadowRoot?.appendChild(id);

			const wave = this.ownerDocument.createElement('p');
			wave.innerText = element.wave;
			this.shadowRoot?.appendChild(wave);
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

customElements.define('app-dashboard', Dashboard);