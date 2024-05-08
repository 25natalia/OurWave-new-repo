import friends, { AttributesFriends } from '../components/friends/friends';
import SongsComponent, { AttributeSongs } from '../components/Songs/Songs';
import { getFriends } from '../services/Firebase';
import { getSongs } from '../services/Firebase';
import { header } from '../services/dataHeader';
import { AttributesHeader } from '../components/header/header';
import { iconosExplore } from '../services/dataMenuExplore';
import { Attribute } from '../components/menu/menu';
import { addObserver, appState, dispatch } from '../store';

export class Explore extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const dataFriends =  await getFriends()
		const dataSongs =  await getSongs()
		console.log(dataFriends, dataSongs)
		this.render(dataFriends, dataSongs );
	}

	render(dataSongs: any, dataFriends:any) {
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

		dataFriends.forEach((song: any) => {
			const mySong = document.createElement('my-songs') as SongsComponent;
			mySong.setAttribute(AttributeSongs.song_title, song.song_title);
			mySong.setAttribute(AttributeSongs.artist, song.artist);
			mySong.setAttribute(AttributeSongs.image, song.image);
			this.shadowRoot?.appendChild(mySong);
		});
		dataSongs.forEach((friend: any) => {
			const myFriend = document.createElement('my-friend') as friends;
			console.log(friend)
			myFriend.setAttribute(AttributesFriends.name, friend.name);
			myFriend.setAttribute(AttributesFriends.profile, friend.profile);
			myFriend.setAttribute(AttributesFriends.photo, friend.photo);
			myFriend.setAttribute(AttributesFriends.song, friend.song);
			this.shadowRoot?.appendChild(myFriend);
		});

	}


}
customElements.define('app-explore', Explore);