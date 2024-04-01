import './components/indexpadre';
import { iconos } from './data/dataMenu';
import { Attribute } from './components/menu/menu';
import { header } from './data/dataHeader';
import { Attributes } from './components/header/header';
import { addcontent } from './data/dataAdd';
import { Attributess } from './components/add/add';
import { profile } from './data/dataProfile';
import { interactions } from './data/dataInteractions';
import { waves } from './data/dataWaves';
import { Attributesss } from './components/card/card';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			header.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-header');
				myHeader.setAttribute(Attributes.logo, iconoHeader.logo);
				myHeader.setAttribute(Attributes.perfil, iconoHeader.perfil);
				this.shadowRoot?.appendChild(myHeader);
			});

			profile.forEach((userProfile) => {
				const myProfile = document.createElement('my-profile');
				myProfile.setAttribute(Attributesss.name, userProfile.name);
				myProfile.setAttribute(Attributesss.image, userProfile.image);
				this.shadowRoot?.appendChild(myProfile);
			});

			waves.forEach((userWave) => {
				const myWave = document.createElement('my-waves');
				myWave.setAttribute(Attributesss.wave, userWave.wave);
				this.shadowRoot?.appendChild(myWave);
			});

			interactions.forEach((userInteractions) => {
				const myInteractions = document.createElement('my-interactions');
				myInteractions.setAttribute(Attributesss.unlike, userInteractions.unlike);
				myInteractions.setAttribute(Attributesss.like, userInteractions.like);
				myInteractions.setAttribute(Attributesss.cantidadlike, userInteractions.cantidadlike);
				myInteractions.setAttribute(Attributesss.share, userInteractions.share);
				myInteractions.setAttribute(Attributesss.cantidadshare, userInteractions.cantidadshare);
				myInteractions.setAttribute(Attributesss.comentar, userInteractions.comentar);
				myInteractions.setAttribute(Attributesss.cantidadcomentar, userInteractions.cantidadcomentar);
				this.shadowRoot?.appendChild(myInteractions);
			});

			iconos.forEach((iconoData) => {
				const myIcono = document.createElement('my-iconos');
				myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
				myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
				myIcono.setAttribute(Attribute.iconochats, iconoData.iconochats);
				myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
				this.shadowRoot?.appendChild(myIcono);
			});

			addcontent.forEach((addButton) => {
				const addContent = document.createElement('my-addcontent');
				addContent.setAttribute(Attributess.iconoadd, addButton.iconoadd);
				this.shadowRoot?.appendChild(addContent);
			});
		}
	}
}

customElements.define('app-container', AppContainer);
