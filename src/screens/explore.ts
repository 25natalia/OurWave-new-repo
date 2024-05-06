import { AttributesFriends } from '../components/friends/friends';
import { AttributeSongs } from '../components/Songs/Songs';
import { getFriends } from '../services/Firebase';
import { getSongs } from '../services/Firebase';

export class Explore extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.renderSongs();
		this.renderFriends();
	}

	async renderSongs() {
		if (this.shadowRoot) {
			const dataSongs = await getSongs();
			dataSongs.forEach((song: any) => {
				const mySong = document.createElement('my-perfil');
				mySong.setAttribute(AttributeSongs.song_title, song.song_title);
				mySong.setAttribute(AttributeSongs.artist, song.artist);
				mySong.setAttribute(AttributeSongs.image, song.image);
				this.shadowRoot?.appendChild(mySong);
			});
		}
	}
	async renderFriends() {
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
