import './screens/dashboard';
import './components/indexpadre';
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
		const dashboard = this.ownerDocument.createElement('app-dashboard');
		this.shadowRoot?.appendChild(dashboard);
	}
}

customElements.define('app-container', AppContainer);
