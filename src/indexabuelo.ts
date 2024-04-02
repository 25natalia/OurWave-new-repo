import './components/indexpadre';
import { iconos } from './data/dataMenu';
import { Attribute } from './components/menu/menu';
import { header } from './data/dataHeader';
import { Attributes } from './components/header/header';
import { addcontent } from './data/dataAdd';
import { Attributess } from './components/add/add';
import { profile } from './data/dataProfile';
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

			profile.forEach((element) => {
				const myCard = document.createElement('my-card');
				console.log(element);
				myCard.setAttribute(Attributesss.name, element.name);
				myCard.setAttribute(Attributesss.image, element.image);
				myCard.setAttribute(Attributesss.wave, element.wave);
				myCard.setAttribute(Attributesss.unlike, element.unlike);
				myCard.setAttribute(Attributesss.cantidadlike, element.cantidadlike);
				myCard.setAttribute(Attributesss.share, element.share);
				myCard.setAttribute(Attributesss.cantidadshare, element.cantidadshare);
				myCard.setAttribute(Attributesss.comentar, element.comentar);
				myCard.setAttribute(Attributesss.cantidadcomentar, element.cantidadcomentar);
				this.shadowRoot?.appendChild(myCard);
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
