import './screens/dashboard';
import './screens/perfil';
import { getSongs } from './services/Firebase';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		const dataSongs = getSongs();
	}

	render() {
		const dashboard = this.ownerDocument.createElement('app-perfil');
		this.shadowRoot?.appendChild(dashboard);
	}
}

customElements.define('app-container', AppContainer);
