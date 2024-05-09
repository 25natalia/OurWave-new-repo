import styles from '../register/register.css';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';

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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <section class="todo">

      <svg class="svg" xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#2ec4b6" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>

      <img class="logo" src="${this.logo}"></img>

      <section class="info">
			<h1 class="text_create">Log in to your account</h1>

      <section class="inputs">
			<form>
			<input type="Email" placeholder="Email or Username"></input>
			<input type="Password" placeholder="Password"></input>
      </section>
			<button type="submit">Sign In</button>
			</form>
      </section>
			<p class="text">Or sign in with</p>

      <section id="apps">
      <img class="google" src="${this.google}"></img>
      <img class="facebook" src="${this.facebook}"></img>
      <img class="outlook" src="${this.outlook}"></img>
      </section>
      <section class="already_have">
      <p class="text">Don't have an account?</p>
      <p class="signup_btn" >Sign Up</p>
      </section>
      </section>
    `;
		}

		const svg = this.shadowRoot?.querySelector('.svg');
		svg?.addEventListener('click', () => {
			dispatch(navigate('PROFILE'));
		});

		const profileIcon = this.shadowRoot?.querySelector('.signup_btn');
		profileIcon?.addEventListener('click', () => {
			dispatch(navigate('REGISTER'));
		});

		const cssRegister = this.ownerDocument.createElement('style');
		cssRegister.innerHTML = styles;
		this.shadowRoot?.appendChild(cssRegister);
	}
}

export default LoginComponent;
customElements.define('my-login', LoginComponent);
