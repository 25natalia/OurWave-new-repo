import { AttributesFriends } from '../components/friends/friends';
import { getFriends } from '../services/Firebase';

export class Explore extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	async render() {
		if (this.shadowRoot) {
			const dataFriends = await getFriends();
			dataFriends.forEach((friend: any) => {
				const myFriend = document.createElement('my-friend');
				myFriend.setAttribute(AttributesFriends.name, friend.name);
				myFriend.setAttribute(AttributesFriends.profile, friend.profile);
        myFriend.setAttribute(AttributesFriends.photo, friend.photo);
        myFriend.setAttribute(AttributesFriends.song, friend.song);
				this.shadowRoot?.appendChild(myFriend);
			});
		}
	}
}
customElements.define('app-explore', Explore);
