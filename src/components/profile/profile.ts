import styles from './profile.css';
import { updateFavCancion } from '../../services/Firebase';

export enum AttributeProfile {
	'profile_image' = 'profile_image',
	'username' = 'username',
	'fav_song' = 'fav_song',
	'name' = 'name',
	'followers' = 'followers',
	'following' = 'following',
}

class Perfil extends HTMLElement {
	profile_image?: string;
	username?: string;
	fav_song?: string;
	name?: string;
	followers?: string;
	following?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeProfile, null> = {
			profile_image: null,
			username: null,
			fav_song: null,
			name: null,
			followers: null,
			following: null,
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

	render() {
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
    <p class="name">${this.name}</p>
		<p class="following">${this.following}</p>
		</section>

    <p class="followers">${this.followers}</p>
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

		const modal = this.shadowRoot?.querySelector('.modalContainer') as HTMLDivElement;
		const button = this.shadowRoot?.querySelector('#ButtonSong') as HTMLButtonElement;
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
			});
		}

		const cssProfile = this.ownerDocument.createElement('style');
		cssProfile.innerHTML = styles;
		this.shadowRoot?.appendChild(cssProfile);
	}
}

export default Perfil;
customElements.define('my-perfil', Perfil);
