import styles from './register.css';
import { dispatch, appState, addObserver } from '../../store';
import { navigate } from '../../store/actions';
import { createUser } from '../../services/Firebase';
import Firebase from '../../services/Firebase';

const formData = {
	email: '',
	username: '',
	completeName: '',
	password: '',
};

const formDataSongs = {
	top: '●',
	artist: 'Here will be your artist',
	song_title: 'Here will be your song title',
	image: 'https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg',
	duration: '',
	idUser: '',
};

const updateUserId = () => {
	formDataSongs.idUser = appState.userId;
};

export enum AttributeRegister {
	'logo' = 'logo',
	'google' = 'google',
	'facebook' = 'facebook',
	'outlook' = 'outlook',
}

class RegisterComponent extends HTMLElement {
	logo?: string;
	google?: string;
	facebook?: string;
	outlook?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeRegister, null> = {
			logo: null,
			google: null,
			facebook: null,
			outlook: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeRegister, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
	}

	connectedCallback() {
		this.render();
	}

	changeEmail(e: any) {
		formData.email = e?.target?.value;
	}

	changePassword(e: any) {
		formData.password = e?.target?.value;
	}

	changeUsername(e: any) {
		formData.username = e?.target?.value;
	}

	changeCompleteName(e: any) {
		formData.completeName = e?.target?.value;
	}

	async submitForm() {
		try {
			await createUser(formData);

			// Update formDataSongs with the userId from appState
			updateUserId();

			await Firebase.addSong(formDataSongs);
			console.log(formDataSongs);

			dispatch(navigate('PROFILE'));
		} catch (error) {
			console.error('Error registering user:', error);
		}
	}

	render() {
		if (this.shadowRoot) {
			const todoSection = this.ownerDocument.createElement('section');
			todoSection.classList.add('todo');

			const svg = this.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
			svg.classList.add('svg');
			svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			svg.setAttribute('height', '35');
			svg.setAttribute('width', '35');
			svg.setAttribute('viewBox', '0 0 320 512');
			svg.innerHTML =
				'<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#2ec4b6" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>';
			todoSection.appendChild(svg);

			const logoImg = this.ownerDocument.createElement('img');
			logoImg.classList.add('logo');
			logoImg.src = this.logo || 'undefined';
			todoSection.appendChild(logoImg);

			const infoSection = this.ownerDocument.createElement('section');
			infoSection.classList.add('info');

			const infoText = this.ownerDocument.createElement('h1');
			infoText.classList.add('text_create');
			infoText.textContent = 'Create your account';
			infoSection.appendChild(infoText);

			todoSection.appendChild(infoSection);
			this.shadowRoot.appendChild(todoSection);

			const section = this.ownerDocument.createElement('section');
			section.classList.add('inputs');

			const email = this.ownerDocument.createElement('input');
			email.placeholder = 'Correo electronico';
			email.addEventListener('change', this.changeEmail);
			section.appendChild(email);

			const username = this.ownerDocument.createElement('input');
			username.placeholder = 'Username';
			username.addEventListener('change', this.changeUsername);
			section.appendChild(username);

			const completeName = this.ownerDocument.createElement('input');
			completeName.placeholder = 'Name and Last name';
			completeName.addEventListener('change', this.changeCompleteName);
			section.appendChild(completeName);

			const password = this.ownerDocument.createElement('input');
			password.placeholder = 'Contraseña';
			password.addEventListener('change', this.changePassword);
			section.appendChild(password);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'Registrarme';
			save.addEventListener('click', this.submitForm.bind(this)); // Bind this context
			section.appendChild(save);
			this.shadowRoot.appendChild(section);

			const secondTodoSection = this.ownerDocument.createElement('section');
			secondTodoSection.classList.add('todo');

			const signUpText = this.ownerDocument.createElement('p');
			signUpText.classList.add('text');
			signUpText.textContent = 'Or sign up with';
			secondTodoSection.appendChild(signUpText);

			const appsSection = this.ownerDocument.createElement('section');
			appsSection.id = 'apps';

			const googleImg = this.ownerDocument.createElement('img');
			googleImg.classList.add('google');
			googleImg.src = this.google || 'undefined';
			appsSection.appendChild(googleImg);

			const facebookImg = this.ownerDocument.createElement('img');
			facebookImg.classList.add('facebook');
			facebookImg.src = this.facebook || 'undefined';
			appsSection.appendChild(facebookImg);

			const outlookImg = this.ownerDocument.createElement('img');
			outlookImg.classList.add('outlook');
			outlookImg.src = this.outlook || 'undefined';
			appsSection.appendChild(outlookImg);

			secondTodoSection.appendChild(appsSection);

			const alreadyHaveSection = this.ownerDocument.createElement('section');
			alreadyHaveSection.classList.add('already_have');

			const alreadyHaveText = this.ownerDocument.createElement('p');
			alreadyHaveText.classList.add('text');
			alreadyHaveText.textContent = 'Already have an account?';
			alreadyHaveSection.appendChild(alreadyHaveText);

			const loginText = this.ownerDocument.createElement('p');
			loginText.classList.add('signup_btn');
			loginText.textContent = 'Log In';
			alreadyHaveSection.appendChild(loginText);

			secondTodoSection.appendChild(alreadyHaveSection);
			this.shadowRoot.appendChild(secondTodoSection);

			// Añadir event listeners
			svg.addEventListener('click', () => {
				dispatch(navigate('PROFILE'));
			});

			loginText.addEventListener('click', () => {
				dispatch(navigate('LOGIN'));
			});

			// Añadir estilos
			const cssRegister = this.ownerDocument.createElement('style');
			cssRegister.innerHTML = styles;
			this.shadowRoot.appendChild(cssRegister);
		}
	}
}

export default RegisterComponent;
customElements.define('my-register', RegisterComponent);
