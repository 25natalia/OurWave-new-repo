import styles from './profile.css';
import { updateFavCancion } from '../../services/Firebase';
import { typeAddSongs } from '../../types/songs';
import Firebase from '../../services/Firebase';
import { SongsComponent } from '../../components/indexpadre';
import { AttributeSongs } from '../../components/Songs/Songs';

const formData: Omit<typeAddSongs, 'id'> = {
	top: '',
	artist: '',
	song_title: '',
	image: '',
	duration: '',
};

export enum AttributeProfile {
	'profile_image' = 'profile_image',
	'username' = 'username',
	'fav_song' = 'fav_song',
	'completeName' = 'completeName',
}

class Perfil extends HTMLElement {
	profile_image?: string;
	username?: string;
	fav_song?: string;
	completeName?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeProfile, null> = {
			profile_image: null,
			username: null,
			fav_song: null,
			completeName: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeProfile, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
	}

	connectedCallback() {
		this.render();
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

	async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
		<section class="todo">
		<section class="profile">
		<img class="image" src="${this.profile_image}"></img>
		<h1>${this.username}</h1>
		<Button class="edit">Edit picture</Button>
		<button id="ButtonSong">
		<p class="fav_song"><svg class="pin"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(46, 196, 182);transform: ;msFilter:;"><path d="M15 11.586V6h2V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2h2v5.586l-2.707 1.707A.996.996 0 0 0 6 14v2a1 1 0 0 0 1 1h4v3l1 2 1-2v-3h4a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L15 11.586z"></path></svg></svg>
		${this.fav_song}</p>
		</section>
		<section class="name-following">
		<p class="name">${this.completeName}</p>
		<p class="following">100 following</p>
		</section>
		<p class="followers">238 followers</p>
		<Button class="playlist">Playlists</Button>
		</section>
		</section>
		<section class="modalContainer" style="display:none;">
		<form class="waveSong">
		    <span class="close">X</span>
		    <h2>What's your wave song at the moment?</h2>
		    <textarea id="writtenSong" name="wave"></textarea>
		    <span role="button" class="post">Post</span>
		</form>
		`;
		}
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
		image.classList.add('coverImage');
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
		// funciones para actualizar canción
		const modal = this.shadowRoot?.querySelector('.modalContainer') as HTMLDivElement;
		const button = this.shadowRoot?.querySelector('#ButtonSong') as HTMLButtonElement;
		const span = this.shadowRoot?.querySelector('.close') as HTMLSpanElement;
		const postNewSong = this.shadowRoot?.querySelector('.post') as HTMLDivElement;
		postNewSong.addEventListener('click', async () => {
			const textArea = this.shadowRoot?.querySelector('#writtenSong') as HTMLTextAreaElement;
			const waveSong = textArea.value;
			updateFavCancion(waveSong || 'Add your Wave');
			textArea.value = '';
			modal.style.display = 'none';
			document.body.style.overflow = 'auto';
		});
		const form = this.shadowRoot?.querySelector('.post') as HTMLFormElement;
		form.addEventListener('click', (event) => {
			event.preventDefault();
			const textArea = this.shadowRoot?.querySelector('#writtenSong') as HTMLTextAreaElement;
			const waveSong = textArea.value;
			console.log('Entered wave:', waveSong);
			textArea.value = '';
			modal.style.display = 'none';
			body.style.overflow = 'auto';
		});
		// funciones del modal
		const body = document.body;
		if (body) {
			button.addEventListener('click', () => {
				modal.style.display = 'block';
				body.style.overflow = 'hidden';
			});
			span.addEventListener('click', () => {
				modal.style.display = 'none';
				body.style.overflow = 'auto';
				window.addEventListener('click', (event) => {
					if (event.target == modal) {
						modal.style.display = 'none';
						body.style.overflow = 'auto';
					}
				});
			});
		}
		const cssProfile = this.ownerDocument.createElement('style');
		cssProfile.innerHTML = styles;
		this.shadowRoot?.appendChild(cssProfile);
	}
}

export default Perfil;
customElements.define('my-perfil', Perfil);
