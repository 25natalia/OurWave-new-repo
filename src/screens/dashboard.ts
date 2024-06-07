import { iconos } from '../services/dataMenu';
import { Attribute } from '../components/menu/menu';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { addObserver } from '../store';
import Firebase, { addWave, getPostListener } from '../services/Firebase';
import { waves } from '../types/waves';
import styles from './dashboard.css';
import { getUser } from '../services/Firebase';
import { appState, dispatch } from '../store';
import { getWaves } from '../store/actions';

const formData: Omit<waves, 'id'> = {
	wave: '',
	idUser: '',
};

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataUser = await getUser(appState.userId);
		if (appState.waves.length === 0) {
			const action = await getWaves();
			dispatch(action);
		} else {
			this.render(dataUser);
		}
	}

	changeWave(e: any) {
		formData.wave = e.target.value;
	}

	submitForm() {
		formData.idUser = appState.userId;
		Firebase.addWave(formData);
	}

	render(dataUser: any) {
		if (this.shadowRoot) {
			header.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-header');
				myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
				this.shadowRoot?.appendChild(myHeader);
			});

			const titleHome = this.ownerDocument.createElement('h1');
			titleHome.textContent = 'Share your wave!';
			this.shadowRoot?.appendChild(titleHome);

			const enterWave = this.ownerDocument.createElement('input');
			enterWave.placeholder = 'Enter your Wave';
			enterWave.classList.add('image');
			enterWave.addEventListener('change', this.changeWave);
			this.shadowRoot.appendChild(enterWave);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Share';
			save.classList.add('save');
			save.addEventListener('click', this.submitForm.bind(this));
			this.shadowRoot?.appendChild(save);

			const forYou = this.ownerDocument.createElement('h2');
			forYou.textContent = 'For You';
			this.shadowRoot?.appendChild(forYou);
		}

		const waves = this.ownerDocument.createElement('section');
		this.shadowRoot?.appendChild(waves);

		getPostListener((posts) => {
			while (waves.firstChild) {
				waves.removeChild(waves.firstChild);
			}

			posts.forEach((element: waves) => {

				const cardEntera = this.ownerDocument.createElement('section');
				cardEntera.className = 'cardEntera';
				waves.prepend(cardEntera);

				const photoUsername = this.ownerDocument.createElement('section');
				photoUsername.className = 'photoUsername';
				cardEntera.appendChild(photoUsername);

				const photoSection = this.ownerDocument.createElement('section');
				photoSection.className = 'photoSection';
				photoUsername.appendChild(photoSection);

				const profilePic = this.ownerDocument.createElement('img');
				profilePic.src =
					dataUser.profile_image ||
					'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg';
				photoSection.appendChild(profilePic);

				const usernameSection = this.ownerDocument.createElement('section');
				usernameSection.className = 'usernameSection';
				photoUsername.appendChild(usernameSection);

				const username = this.ownerDocument.createElement('p');
				username.innerText = dataUser.username;
				usernameSection.appendChild(username);

				const waveSection = this.ownerDocument.createElement('section');
				waveSection.className = 'waveSection';
				cardEntera.appendChild(waveSection);

				const wave = this.ownerDocument.createElement('p');
				wave.innerText = element.wave;
				waveSection.appendChild(wave);

				const interactionsSection = this.ownerDocument.createElement('section');
				interactionsSection.className = 'interactionsSection';
				cardEntera.appendChild(interactionsSection);

				const likeSection = this.ownerDocument.createElement('section');
				likeSection.className = 'likeSection';
				interactionsSection.appendChild(likeSection);

				const unlike = this.ownerDocument.createElement('div');
				unlike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
			<path fill="#2ec6b6" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
			</svg>`;

				unlike.addEventListener('click', () => {
					unlike.style.display = 'none';
					like.style.display = 'block';
				});
				likeSection.appendChild(unlike);

				const like = this.ownerDocument.createElement('div');
				like.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
			<path fill="#2ec6bc" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
			</svg>`;
				like.style.display = 'none';
				like.addEventListener('click', () => {
					like.style.display = 'none';
					unlike.style.display = 'block';
				});
				likeSection.appendChild(like);

				const likenumber = this.ownerDocument.createElement('h3');
				likenumber.innerText = '12k';
				likeSection.appendChild(likenumber);

				const sendSection = this.ownerDocument.createElement('section');
				sendSection.className = 'sendSection';
				interactionsSection.appendChild(sendSection);

				const sendIcon = this.ownerDocument.createElement('svg');
				sendIcon.innerHTML =
					'<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#2ec6b6" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>';
				sendSection.appendChild(sendIcon);

				const sendnumber = this.ownerDocument.createElement('h3');
				sendnumber.innerText = '3.5k';
				sendSection.appendChild(sendnumber);

				const comentSection = this.ownerDocument.createElement('section');
				comentSection.className = 'comentSection';
				interactionsSection.appendChild(comentSection);

				const comentIcon = this.ownerDocument.createElement('svg');
				comentIcon.innerHTML =
					'<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#2ec6b6" d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>';
				comentSection.appendChild(comentIcon);

				const comentnumber = this.ownerDocument.createElement('h3');
				comentnumber.innerText = '8.3k';
				comentSection.appendChild(comentnumber);
			});
		});

		iconos.forEach((iconoData) => {
			const myIcono = document.createElement('my-iconos');
			myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
			myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
			myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
			this.shadowRoot?.appendChild(myIcono);
		});

		const cssDashboard = this.ownerDocument.createElement('style');
		cssDashboard.innerHTML = styles;
		this.shadowRoot?.appendChild(cssDashboard);
	}
}

customElements.define('app-dashboard', Dashboard);
