import { headerPerfil } from '../services/dataHeaderPerfil';
import { AttributesHeaderProfile } from '../components/header/headerProfile';
import { iconosProfile } from '../services/dataMenuProfile';
import { Attribute } from '../components/menu/menu';
import { AttributeProfile } from '../components/profile/profile';
import styles from './perfil.css';
import { addObserver } from '../store';
import { getUser } from '../services/Firebase';

export class Perfil extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataUser = await getUser('gvwWdixou6QvruLSFuVBhn1vDEF3');
		this.render(dataUser);
	}

	async render(dataUser: any) {
		if (this.shadowRoot) {
			headerPerfil.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-headerprofile');
				myHeader.setAttribute(AttributesHeaderProfile.logo, iconoHeader.logo);
				myHeader.setAttribute(AttributesHeaderProfile.log_out, iconoHeader.log_out);
				this.shadowRoot?.appendChild(myHeader);
			});
		}

		const myUser = document.createElement('my-perfil');
		myUser.setAttribute(AttributeProfile.profile_image, dataUser.profile_image);
		myUser.setAttribute(AttributeProfile.username, dataUser.username);
		myUser.setAttribute(AttributeProfile.completeName, dataUser.completeName);
		myUser.setAttribute(AttributeProfile.fav_song, dataUser.fav_song);
		this.shadowRoot?.appendChild(myUser);

		iconosProfile.forEach((iconoData) => {
			const myIcono = document.createElement('my-iconos');
			myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
			myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
			myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
			this.shadowRoot?.appendChild(myIcono);
		});

		const cssPerfil = this.ownerDocument.createElement('style');
		cssPerfil.innerHTML = styles;
		this.shadowRoot?.appendChild(cssPerfil);
	}
}
customElements.define('app-perfil', Perfil);
