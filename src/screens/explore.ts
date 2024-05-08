import friends, { AttributesFriends } from '../components/friends/friends';
import SongsComponent, { AttributeSongs } from '../components/Songs/Songs';
import { getFriends } from '../services/Firebase';
import { getSongs } from '../services/Firebase';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { iconosExplore } from '../services/dataMenuExplore';
import { Attribute } from '../components/menu/menu';
import { addObserver, appState, dispatch } from '../store';
import styles from './explore.css';

export class Explore extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataFriends = await getFriends();
		const dataSongs = await getSongs();
		console.log(dataFriends, dataSongs);
		this.render(dataFriends, dataSongs);
	}

	render(dataSongs: any, dataFriends: any) {
		if (this.shadowRoot) {
			header.forEach((iconoHeader) => {
				const myHeader = document.createElement('my-header');
				myHeader.setAttribute(AttributesHeader.logo, iconoHeader.logo);
				this.shadowRoot?.appendChild(myHeader);
			});
		}

		iconosExplore.forEach((iconoData) => {
			const myIcono = document.createElement('my-iconos');
			myIcono.setAttribute(Attribute.iconohome, iconoData.iconohome);
			myIcono.setAttribute(Attribute.iconoexplore, iconoData.iconoexplore);
			myIcono.setAttribute(Attribute.iconoprofile, iconoData.iconoprofile);
			this.shadowRoot?.appendChild(myIcono);
		});

		const titleSongs = this.ownerDocument.createElement('h1');
		titleSongs.textContent = 'On trending';
		this.shadowRoot?.appendChild(titleSongs);

		dataFriends.forEach((song: any) => {
			const mySong = document.createElement('my-songs') as SongsComponent;
			mySong.setAttribute(AttributeSongs.song_title, song.song_title);
			mySong.setAttribute(AttributeSongs.artist, song.artist);
			mySong.setAttribute(AttributeSongs.image, song.image);
			this.shadowRoot?.appendChild(mySong);
		});

		const titleFriends = this.ownerDocument.createElement('h1');
		titleFriends.textContent = 'My friends playlist';
		this.shadowRoot?.appendChild(titleFriends);

		dataSongs.forEach((friend: any) => {
			const myFriend = document.createElement('my-friend') as friends;
			console.log(friend);
			myFriend.setAttribute(AttributesFriends.name, friend.name);
			myFriend.setAttribute(AttributesFriends.profile, friend.profile);
			myFriend.setAttribute(AttributesFriends.photo, friend.photo);
			myFriend.setAttribute(AttributesFriends.song, friend.song);
			this.shadowRoot?.appendChild(myFriend);
		});
<<<<<<< HEAD

		const cssExplore = this.ownerDocument.createElement('style');
		cssExplore.innerHTML = styles;
		this.shadowRoot?.appendChild(cssExplore);
	}
}
customElements.define('app-explore', Explore);

=======
	}
}
customElements.define('app-explore', Explore);
>>>>>>> f9b1046bafcaec106cb451df1fe3173908d844e5
