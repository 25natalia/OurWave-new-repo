import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { iconos } from '../services/dataMenu';
import { Attribute } from '../components/menu/menu';

export class Perfil extends HTMLElement {
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
				myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
				this.shadowRoot?.appendChild(myHeader);
			});
		}

		iconos.forEach((iconoData) => {
			const myIcono = document.createElement('my-iconos');
			myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
			myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
			myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
			this.shadowRoot?.appendChild(myIcono);
		});
	}
}
customElements.define('app-perfil', Perfil);
