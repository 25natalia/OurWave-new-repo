import './screens/dashboard';
import './screens/perfil';
import './screens/explore';
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
		const dashboard = this.ownerDocument.createElement('app-explore');
		this.shadowRoot?.appendChild(dashboard);
	}
}

customElements.define('app-container', AppContainer);
