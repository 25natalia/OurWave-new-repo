import { AttributeRegister } from '../components/register/register';
import { signin } from '../services/dataSignIn';
import { addObserver } from '../store';

export class Register extends HTMLElement {
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
				const mySignin = document.createElement('my-register');
				mySignin.setAttribute(AttributeRegister.logo, attrs.logo);
				mySignin.setAttribute(AttributeRegister.google, attrs.google);
				mySignin.setAttribute(AttributeRegister.facebook, attrs.facebook);
				mySignin.setAttribute(AttributeRegister.outlook, attrs.outlook);
				this.shadowRoot?.appendChild(mySignin);
			});
		}
	}
}

customElements.define('app-register', Register);
