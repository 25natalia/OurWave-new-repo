import './screens/dashboard';
import './screens/perfil';
import './screens/explore';
import { getSongs } from './services/Firebase';
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
		switch (appState.screen) {
			case 'HOME':
				const dashboard = this.ownerDocument.createElement('app-dashboard');
				this.shadowRoot?.appendChild(dashboard);
				break;

			case 'PROFILE':
				const profile = this.ownerDocument.createElement('app-perfil');
				this.shadowRoot?.appendChild(profile);
			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);
