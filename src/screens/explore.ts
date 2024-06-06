import friends, { AttributesFriends } from '../components/friends/friends';
import SongsComponent, { AttributeSongs } from '../components/Songs/Songs';
import { getFriends } from '../services/Firebase';
import { getSongs } from '../services/Firebase';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { iconosExplore } from '../services/dataMenuExplore';
import { Attribute } from '../components/menu/menu';
import { addObserver, appState, dispatch } from '../store';
import { typeAddSongs } from '../types/songs';
import { getUserSongs } from '../store/actions';
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
		if (appState.userSongs.length === 0) {
			const action = await getUserSongs();
			dispatch(action);
		}
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

		dataFriends.forEach((song: any, index: number) => {
			const mySong = document.createElement('my-songs') as SongsComponent;
			mySong.setAttribute(AttributeSongs.top, song.top);
			mySong.setAttribute(AttributeSongs.song_title, song.song_title);
			mySong.setAttribute(AttributeSongs.artist, song.artist);
			mySong.setAttribute(AttributeSongs.image, song.image);
			mySong.setAttribute('data-index', (index + 1).toString());
			this.shadowRoot?.appendChild(mySong);
		});

		const titleFriends = this.ownerDocument.createElement('h1');
		titleFriends.textContent = 'My friends playlist';
		this.shadowRoot?.appendChild(titleFriends);

		const section = this.ownerDocument.createElement('section');
		section.classList.add('playlists');

		dataSongs.forEach((friend: any) => {
			const myFriend = document.createElement('my-friend') as friends;
			console.log(friend);
			myFriend.setAttribute(AttributesFriends.name, friend.name);
			myFriend.setAttribute(AttributesFriends.profile, friend.profile);
			myFriend.setAttribute(AttributesFriends.photo, friend.photo);
			myFriend.setAttribute(AttributesFriends.song, friend.song);
			section.appendChild(myFriend);
		});
		this.shadowRoot?.appendChild(section);

		const titleFriendsSongs = this.ownerDocument.createElement('h1');
		titleFriendsSongs.textContent = 'Wave songs';
		this.shadowRoot?.appendChild(titleFriendsSongs);

		appState.userSongs.forEach((p: typeAddSongs) => {
			const card = this.ownerDocument.createElement('my-songs') as SongsComponent;
			card.setAttribute(AttributeSongs.top, '●');
			card.setAttribute(AttributeSongs.image, p.image);
			card.setAttribute(AttributeSongs.artist, p.artist);
			card.setAttribute(AttributeSongs.song_title, p.song_title);
			this.shadowRoot?.appendChild(card);
		});

		const cssExplore = this.ownerDocument.createElement('style');
		cssExplore.innerHTML = styles;
		this.shadowRoot?.appendChild(cssExplore);
	}
}
customElements.define('app-explore', Explore);
