import styles from './register.css';

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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#2ec4b6" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>

      <section class="todo">
      <img class="logo" src="${this.logo}"></img>
			<h1>Create your account</h1>

      <section class="inputs">
			<form>
			<input type="Email" placeholder="Email"></input>
			<input type="Username" placeholder="Username"></input>
			<input type="Password" placeholder="Password"></input>
      </section>
			<button type="submit">Sign In</button>
			</form>

			<p>Or sign up with</p>

      <section id="apps">
      <img class="google" src="${this.google}"></img>
      <img class="facebook" src="${this.facebook}"></img>
      <img class="outlook" src="${this.outlook}"></img>
      </section>
      </section>
    `;
		}

		const cssRegister = this.ownerDocument.createElement('style');
		cssRegister.innerHTML = styles;
		this.shadowRoot?.appendChild(cssRegister);
	}
}

export default RegisterComponent;
customElements.define('my-register', RegisterComponent);
