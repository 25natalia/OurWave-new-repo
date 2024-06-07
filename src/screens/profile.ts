import { headerPerfil } from '../services/dataHeaderPerfil';
import { AttributesHeaderProfile } from '../components/header/headerProfile';
import { iconosProfile } from '../services/dataMenuProfile';
import { Attribute } from '../components/menu/menu';
import { AttributeProfile } from '../components/profile/profile';
import { addObserver, appState } from '../store';
import { getUser } from '../services/Firebase';

export class Perfil extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataUser = await getUser(appState.userId);
		console.log(dataUser);

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
		myUser.setAttribute(
			AttributeProfile.profile_image,
			dataUser.profile_image ||
				'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
		);
		myUser.setAttribute(AttributeProfile.username, dataUser.username);
		myUser.setAttribute(AttributeProfile.completeName, dataUser.completeName);
		myUser.setAttribute(AttributeProfile.fav_song, dataUser.fav_song || 'Add Your Wave Song');
		this.shadowRoot?.appendChild(myUser);

		iconosProfile.forEach((iconoData) => {
			const myIcono = document.createElement('my-iconos');
			myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
			myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
			myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
			this.shadowRoot?.appendChild(myIcono);
		});
	}
}
customElements.define('app-perfil', Perfil);
