import { AttributeLogin } from '../components/login/login';
import { signin } from '../services/dataSignIn';
import { addObserver } from '../store';

export class Login extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			signin.forEach((attrs) => {
				const myLogin = document.createElement('my-login');
				myLogin.setAttribute(AttributeLogin.logo, attrs.logo);
				myLogin.setAttribute(AttributeLogin.google, attrs.google);
				myLogin.setAttribute(AttributeLogin.facebook, attrs.facebook);
				myLogin.setAttribute(AttributeLogin.outlook, attrs.outlook);
				this.shadowRoot?.appendChild(myLogin);
			});
		}
	}
}

customElements.define('app-login', Login);
