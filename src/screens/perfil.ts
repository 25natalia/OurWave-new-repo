import { headerPerfil } from '../services/dataHeaderPerfil';
import { AttributesHeaderProfile } from '../components/header/headerProfile';
import { iconosProfile } from '../services/dataMenuProfile';
import { Attribute } from '../components/menu/menu';
import Firebase from '../services/Firebase';
import { AttributeProfile } from '../components/profile/profile';
import { typeAddSongs } from '../types/songs';
import { SongsComponent } from '../components/indexpadre';
import { AttributeSongs } from '../components/Songs/Songs';
import styles from './perfil.css';
import { addObserver } from '../store';
import { getUser } from '../services/Firebase';

const formData: Omit<typeAddSongs, 'id'> = {
	top: '',
	artist: '',
	song_title: '',
	image: '',
	duration: '',
};

export class Perfil extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataUser = await getUser('e14Adty5xAvKNl0ceGnc');
		this.render(dataUser);
	}

	submitForm() {
		console.log(formData);
		Firebase.addSong(formData);
	}

	changeArtist(e: any) {
		formData.artist = e.target.value;
	}

	changeTitle(e: any) {
		formData.song_title = e.target.value;
	}
	changeImage(e: any) {
		formData.image = e.target.value;
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
		myUser.setAttribute(AttributeProfile.name, dataUser.name);
		myUser.setAttribute(AttributeProfile.fav_song, dataUser.fav_song);
		myUser.setAttribute(AttributeProfile.followers, dataUser.followers);
		myUser.setAttribute(AttributeProfile.following, dataUser.following);
		this.shadowRoot?.appendChild(myUser);

		const h1Add = this.ownerDocument.createElement('h1');
		h1Add.textContent = 'Add your own song';
		h1Add.classList.add('h1Add');
		this.shadowRoot?.appendChild(h1Add);

		const section = this.ownerDocument.createElement('section');
		section.classList.add('create-song');

		const artist = this.ownerDocument.createElement('input');
		artist.placeholder = 'Add an artist';
		artist.classList.add('artist');
		artist.addEventListener('change', this.changeArtist);
		section.appendChild(artist);

		const title = this.ownerDocument.createElement('input');
		title.placeholder = 'Add the song title';
		title.classList.add('title');
		title.addEventListener('change', this.changeTitle);
		section.appendChild(title);

		const image = this.ownerDocument.createElement('input');
		image.placeholder = 'Add the album cover';
		image.classList.add('image');
		image.addEventListener('change', this.changeImage);
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
			card.setAttribute(AttributeSongs.top, '●');
			card.setAttribute(AttributeSongs.image, p.image);
			card.setAttribute(AttributeSongs.artist, p.artist);
			card.setAttribute(AttributeSongs.song_title, p.song_title);

			this.shadowRoot?.appendChild(card);
		});

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
