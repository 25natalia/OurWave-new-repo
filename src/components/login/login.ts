import styles from '../register/register.css';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { logIn } from '../../services/Firebase';

const formData = {
	email: '',
	password: '',
};

export enum AttributeLogin {
	'logo' = 'logo',
	'google' = 'google',
	'facebook' = 'facebook',
	'outlook' = 'outlook',
}

class LoginComponent extends HTMLElement {
	logo?: string;
	google?: string;
	facebook?: string;
	outlook?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeLogin, null> = {
			logo: null,
			google: null,
			facebook: null,
			outlook: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeLogin, oldValue: string | undefined, newValue: string | undefined) {
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

	submitForm() {
		logIn(formData);
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;
		}

		const sectionTodo = document.createElement('section');
		sectionTodo.className = 'todo';

		const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgIcon.setAttribute('class', 'svg');
		svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		svgIcon.setAttribute('height', '35');
		svgIcon.setAttribute('width', '35');
		svgIcon.setAttribute('viewBox', '0 0 320 512');
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('fill', '#2ec4b6');
		path.setAttribute(
			'd',
			'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z'
		);
		svgIcon.appendChild(path);

		const imgLogo = document.createElement('img');
		imgLogo.className = 'logo';
		imgLogo.src = this.logo || 'undefined';

		const sectionInfo = document.createElement('section');
		sectionInfo.className = 'info';

		const h1Text = document.createElement('h1');
		h1Text.className = 'text_create';
		h1Text.textContent = 'Log in to your account';

		const sectionInputs = document.createElement('section');
		sectionInputs.className = 'inputs';

		const form = document.createElement('form');

		const inputEmail = document.createElement('input');
		inputEmail.type = 'Email';
		inputEmail.addEventListener('change', this.changeEmail);
		inputEmail.placeholder = 'Email';

		const inputPassword = document.createElement('input');
		inputPassword.type = 'Password';
		inputPassword.addEventListener('change', this.changePassword);
		inputPassword.placeholder = 'Password';

		sectionInputs.appendChild(form);
		form.appendChild(inputEmail);
		form.appendChild(inputPassword);

		const buttonLogin = document.createElement('button');
		buttonLogin.id = 'login';
		buttonLogin.type = 'submit';
		buttonLogin.addEventListener('click', this.submitForm);
		buttonLogin.textContent = 'Log In';

		form.appendChild(buttonLogin);

		const pText = document.createElement('p');
		pText.className = 'text';
		pText.textContent = 'Or sign in with';

		const sectionApps = document.createElement('section');
		sectionApps.id = 'apps';

		const imgGoogle = document.createElement('img');
		imgGoogle.className = 'google';
		imgGoogle.src = this.google || 'undefined';

		const imgFacebook = document.createElement('img');
		imgFacebook.className = 'facebook';
		imgFacebook.src = this.facebook || 'undefined';

		const imgOutlook = document.createElement('img');
		imgOutlook.className = 'outlook';
		imgOutlook.src = this.outlook || 'undefined';

		sectionApps.appendChild(imgGoogle);
		sectionApps.appendChild(imgFacebook);
		sectionApps.appendChild(imgOutlook);

		const sectionAlreadyHave = document.createElement('section');
		sectionAlreadyHave.className = 'already_have';

		const pText2 = document.createElement('p');
		pText2.className = 'text';
		pText2.textContent = "Don't have an account?";

		const pSignUp = document.createElement('p');
		pSignUp.className = 'signup_btn';
		pSignUp.textContent = 'Sign Up';

		sectionAlreadyHave.appendChild(pText2);
		sectionAlreadyHave.appendChild(pSignUp);

		// Append all created elements to the main section
		sectionInfo.appendChild(h1Text);
		sectionInfo.appendChild(sectionInputs);
		sectionTodo.appendChild(svgIcon);
		sectionTodo.appendChild(imgLogo);
		sectionTodo.appendChild(sectionInfo);
		sectionTodo.appendChild(pText);
		sectionTodo.appendChild(sectionApps);
		sectionTodo.appendChild(sectionAlreadyHave);

		this.shadowRoot?.appendChild(sectionTodo);

		const svg = this.shadowRoot?.querySelector('.svg');
		svg?.addEventListener('click', () => {
			dispatch(navigate('PROFILE'));
		});

		const profileIcon = this.shadowRoot?.querySelector('.signup_btn');
		profileIcon?.addEventListener('click', () => {
			dispatch(navigate('REGISTER'));
		});

		const login = this.shadowRoot?.querySelector('#login');
		login?.addEventListener('click', () => {
			dispatch(navigate('DASHBOARD'));
		});

		const cssRegister = this.ownerDocument.createElement('style');
		cssRegister.innerHTML = styles;
		this.shadowRoot?.appendChild(cssRegister);
	}
}

export default LoginComponent;
customElements.define('my-login', LoginComponent);
