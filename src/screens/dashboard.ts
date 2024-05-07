import { iconos } from '../services/dataMenu';
import { Attribute } from '../components/menu/menu';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { addcontent } from '../services/dataAdd';
import { AttributesAdd } from '../components/add/add';
import { profile } from '../services/dataProfile';
import { AttributesCard } from '../components/card/card';
import { addObserver, appState, dispatch } from '../store';
import { navigate } from '../store/actions';

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

			profile.forEach((element) => {
				const myCard = document.createElement('my-card');
				console.log(element);
				myCard.setAttribute(AttributesCard.name, element.name);
				myCard.setAttribute(AttributesCard.image, element.image);
				myCard.setAttribute(AttributesCard.wave, element.wave);
				myCard.setAttribute(AttributesCard.unlike, element.unlike);
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
				if (iconoData.iconoprofile) {
					myIcono.classList.add('profile');
				}

				this.shadowRoot?.appendChild(myIcono);
			});

			const homeIcon = this.shadowRoot?.querySelector('.profile');
			homeIcon?.addEventListener('click', () => {
				dispatch(navigate('PROFILE'));
			});

			addcontent.forEach((addButton) => {
				const addContent = document.createElement('my-addcontent');
				addContent.setAttribute(AttributesAdd.iconoadd, addButton.iconoadd);
				this.shadowRoot?.appendChild(addContent);
			});
		}
	}
}

customElements.define('app-dashboard', Dashboard);
