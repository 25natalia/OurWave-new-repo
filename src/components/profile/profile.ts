import styles from './profile.css';
import { updateFavCancion, uploadFile, updateProfileImg, getFile } from '../../services/Firebase';
import { typeAddSongs } from '../../types/songs';
import Firebase from '../../services/Firebase';
import { SongsComponent } from '../../components/indexpadre';
import { AttributeSongs } from '../../components/Songs/Songs';
import { addObserver, appState, dispatch } from '../../store';
import { getUserSongs } from '../../store/actions';
import { getSongsListener } from '../../services/Firebase';

const formData = {
	top: '',
	artist: '',
	song_title: '',
	image: '',
	duration: '',
	idUser: '',
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
		addObserver(this);
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

	async connectedCallback() {
		if (appState.userSongs.length === 0) {
			const action = await getUserSongs();
			dispatch(action);
		} else {
			this.render();
		}
	}

	submitForm() {
		formData.idUser = appState.userId;
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
		<section class="profileimg">
		<img src="${this.profile_image}"></img>
		</section>
		<h1>${this.username}</h1>
		<Button class="edit" id="edit">Edit picture</Button>
		<button id="ButtonSong">
		<p class="fav_song"><svg class="pin"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(46, 196, 182);transform: ;msFilter:;"><path d="M15 11.586V6h2V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2h2v5.586l-2.707 1.707A.996.996 0 0 0 6 14v2a1 1 0 0 0 1 1h4v3l1 2 1-2v-3h4a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L15 11.586z"></path></svg></svg>
		${this.fav_song}</p>
		</section>
		<section class="name-following">
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
		</section>

		<section id="modalContainerProfileImg" style="display:none;">
		<form class="profileImgForm">
		    <h2>Set your new profile image</h2>
				<textarea id="newProfileImage" name="profileImage" placeholder="Or insert URL"></textarea>
				<section class="botones">
				<span role="button" class="Cancel">Cancel</span>
		    <span role="button" class="Accept">Done</span>
				</section>
		</form>
		</section>
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

		const songs = this.ownerDocument.createElement('section');
		this.shadowRoot?.appendChild(songs);

		getSongsListener((song) => {
			while (songs.firstChild) {
				songs.removeChild(songs.firstChild);
			}
			song.forEach((p: typeAddSongs) => {
				const container = this.ownerDocument.createElement('section');
				songs.appendChild(container);

				const card = this.ownerDocument.createElement('my-songs') as SongsComponent;
				card.setAttribute(AttributeSongs.top, '●');
				card.setAttribute(AttributeSongs.image, p.image);
				card.setAttribute(AttributeSongs.artist, p.artist);
				card.setAttribute(AttributeSongs.song_title, p.song_title);
				container?.appendChild(card);
			});
		});

		// funciones para actualizar canción
		const modal = this.shadowRoot?.querySelector('.modalContainer') as HTMLDivElement;
		const buttonSong = this.shadowRoot?.querySelector('#ButtonSong') as HTMLButtonElement;
		const span = this.shadowRoot?.querySelector('.close') as HTMLSpanElement;
		const postNewSong = this.shadowRoot?.querySelector('.post') as HTMLDivElement;

		postNewSong.addEventListener('click', async () => {
			const textArea = this.shadowRoot?.querySelector('#writtenSong') as HTMLTextAreaElement;
			const waveSong = textArea.value;
			updateFavCancion(waveSong);
			textArea.value = '';
			modal.style.display = 'none';
			document.body.style.overflow = 'auto';
		});
		const form = this.shadowRoot?.querySelector('.post') as HTMLFormElement;
		form.addEventListener('click', (event) => {
			event.preventDefault();
			const textArea = this.shadowRoot?.querySelector('#writtenSong') as HTMLTextAreaElement;
			const waveSong = textArea.value;
			textArea.value = '';
			modal.style.display = 'none';
			body.style.overflow = 'auto';
		});
		// funciones del modal
		const body = document.body;
		if (body) {
			buttonSong.addEventListener('click', () => {
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

		const modalImg = this.shadowRoot?.querySelector('#modalContainerProfileImg') as HTMLDivElement;
		const buttonImg = this.shadowRoot?.querySelector('#edit') as HTMLButtonElement;
		const changeProfileImg = this.shadowRoot?.querySelector('.Accept') as HTMLDivElement;
		const cancel = this.shadowRoot?.querySelector('.Cancel') as HTMLSpanElement;

		buttonImg.addEventListener('click', () => {
			modalImg.style.display = 'block';
			document.body.style.overflow = 'hidden';
		});

		changeProfileImg.addEventListener('click', async () => {
			const textAreaImg = this.shadowRoot?.querySelector('#newProfileImage') as HTMLTextAreaElement;
			const profileImg = textAreaImg.value;
			updateProfileImg(profileImg);
			textAreaImg.value = '';
			modalImg.style.display = 'none';
			document.body.style.overflow = 'auto';
		});
		const formImg = this.shadowRoot?.querySelector('.Accept') as HTMLFormElement;
		formImg.addEventListener('click', (event) => {
			event.preventDefault();
			const textAreaImg = this.shadowRoot?.querySelector('#newProfileImage') as HTMLTextAreaElement;
			const profileImg = textAreaImg.value;
			textAreaImg.value = '';
			modalImg.style.display = 'none';
			body.style.overflow = 'auto';
		});

		cancel.addEventListener('click', () => {
			modalImg.style.display = 'none';
			document.body.style.overflow = 'auto';
		});

		window.addEventListener('click', (event) => {
			if (event.target === modalImg) {
				modalImg.style.display = 'none';
				document.body.style.overflow = 'auto';
			}
		});

		const cssProfile = this.ownerDocument.createElement('style');
		cssProfile.innerHTML = styles;
		this.shadowRoot?.appendChild(cssProfile);
	}
}

export default Perfil;
customElements.define('my-perfil', Perfil);
