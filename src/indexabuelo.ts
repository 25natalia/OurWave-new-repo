import './screens/dashboard';
import './screens/perfil';
import './screens/explore';
import './screens/register';
import './screens/login';
import { appState } from './store';
import { addObserver } from './store';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		switch (appState.screen) {
			case 'HOME':
				const dashboard = this.ownerDocument.createElement('app-dashboard');
				this.shadowRoot?.appendChild(dashboard);
				break;

			case 'EXPLORE':
				const explore = this.ownerDocument.createElement('app-explore');
				this.shadowRoot?.appendChild(explore);
				break;

			case 'PROFILE':
				const profile = this.ownerDocument.createElement('app-perfil');
				this.shadowRoot?.appendChild(profile);
				break;

			case 'REGISTER':
				const register = this.ownerDocument.createElement('app-register');
				this.shadowRoot?.appendChild(register);
				break;

			case 'LOGIN':
				const login = this.ownerDocument.createElement('app-login');
				this.shadowRoot?.appendChild(login);
				break;

			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);
