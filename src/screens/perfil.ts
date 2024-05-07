import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { iconosProfile } from '../services/dataMenuProfile';
import { Attribute } from '../components/menu/menu';
import Firebase from '../services/Firebase';
import { AttributeProfile } from '../components/profile/profile';
import { typeAddSongs } from '../types/songs';
import { SongsComponent } from '../components/indexpadre';
import { AttributeSongs } from '../components/Songs/Songs';
import { dataUser } from '../services/dataUser';
import styles from './perfil.css';

const formData: Omit<typeAddSongs, 'id'> = {
	artist: '',
	song_title: '',
	image: '',
};

export class Perfil extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	submitForm() {
		console.log(formData);
		Firebase.addSong(formData);
	}

	changeArtist(e: any) {
		formData.artist = e?.target?.value;
	}

	changeTitle(e: any) {
		formData.song_title = e?.target?.value;
	}
	changeImage(e: any) {
		formData.image = e?.target?.value;
	}

	async render() {
		if (this.shadowRoot) {
			header.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-header');
				myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
				this.shadowRoot?.appendChild(myHeader);
			});
		}
		dataUser.forEach((user) => {
			const myUser = document.createElement('my-perfil');
			myUser.setAttribute(AttributeProfile.profile_image, user.profile_image);
			myUser.setAttribute(AttributeProfile.username, user.username);
			myUser.setAttribute(AttributeProfile.fav_song, user.fav_song);
			myUser.setAttribute(AttributeProfile.name, user.name);
			myUser.setAttribute(AttributeProfile.followers, user.followers);
			myUser.setAttribute(AttributeProfile.following, user.following);
			this.shadowRoot?.appendChild(myUser);
		});

		const h1Add = this.ownerDocument.createElement('h1');
		h1Add.textContent = 'Add your own song';
		h1Add.classList.add('h1Add');
		this.shadowRoot?.appendChild(h1Add);

		const section = this.ownerDocument.createElement('section');
		section.classList.add('create-song');

		const artist = this.ownerDocument.createElement('input');
		artist.placeholder = 'Add an artist';
		artist.classList.add('artist');
		section.appendChild(artist);

		const title = this.ownerDocument.createElement('input');
		title.placeholder = 'Add the song title';
		title.classList.add('title');
		section.appendChild(title);

		const image = this.ownerDocument.createElement('input');
		image.placeholder = 'Add the album cover';
		image.classList.add('image');
		section.appendChild(image);

		this.shadowRoot?.appendChild(section);

		const save = this.ownerDocument.createElement('button');
		save.innerText = 'Save';
		save.classList.add('save');
		save.addEventListener('click', this.submitForm);
		this.shadowRoot?.appendChild(save);

		const addedSongs = await Firebase.getCreatedSongs();
		addedSongs.forEach((p: typeAddSongs) => {
			const card = this.ownerDocument.createElement('my-songs') as SongsComponent;
			card.setAttribute(AttributeSongs.image, p.image);
			card.setAttribute(AttributeSongs.artist, p.artist);
			card.setAttribute(AttributeSongs.song_title, p.song_title);
		});

		iconosProfile.forEach((iconoData) => {
			const myIcono = document.createElement('my-iconos');
			myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
			if (iconoData.iconohome) {
				myIcono.classList.add('home');
			}

			myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
			myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
			this.shadowRoot?.appendChild(myIcono);
		});

		const homeIcon = this.shadowRoot?.querySelector('.home');
		homeIcon?.addEventListener('click', () => {
			console.log('Hola');
		});

		const cssPerfil = this.ownerDocument.createElement('style');
		cssPerfil.innerHTML = styles;
		this.shadowRoot?.appendChild(cssPerfil);
	}
}
customElements.define('app-perfil', Perfil);
