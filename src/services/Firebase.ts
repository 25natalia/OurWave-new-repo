import { initializeApp } from 'firebase/app';
import { getFirestore, updateDoc } from 'firebase/firestore';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { typeAddSongs } from '../types/songs';
import { typeFavSong } from '../types/favSong';

const firebaseConfig = {
	apiKey: 'AIzaSyAS_sGDbQYUNZAoF-ZqZcpjWtLQtBmDvsw',
	authDomain: 'proyecto-dca-1b72d.firebaseapp.com',
	projectId: 'proyecto-dca-1b72d',
	storageBucket: 'proyecto-dca-1b72d.appspot.com',
	messagingSenderId: '272880735350',
	appId: '1:272880735350:web:f0dbcec16d1c028a4afb57',
	measurementId: 'G-L13XCXHTB8',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// aquí se trae la data de cancionces
export const getSongs = async () => {
	const arraySongs: any = [];

	const querySnapshot = await getDocs(collection(db, 'Songs'));
	querySnapshot.forEach((doc) => {
		arraySongs.push(doc.data());
	});
	return arraySongs;
};

// aquí se trae la data de playlist de amigos
export const getFriends = async () => {
	const arrayFriends: any = [];

	const querySnapshot = await getDocs(collection(db, 'Friends-playlist'));
	querySnapshot.forEach((doc) => {
		arrayFriends.push(doc.data());
	});
	return arrayFriends;
};

// aquí se trae la data de users
export const getUser = async () => {
	const arrayUser: any = [];

	const querySnapshot = await getDocs(collection(db, 'users'));
	querySnapshot.forEach((doc) => {
		arrayUser.push(doc.data());
	});
	return arrayUser;
};

// con esto se añaden las nuevas canciones del perfil

export const addSong = async (song: Omit<typeAddSongs, 'id'>) => {
	try {
		const where = collection(db, 'playlist');
		await addDoc(where, song);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

const getCreatedSongs = async () => {
	const querySnapshot = await getDocs(collection(db, 'playlist'));
	const transformed: Array<typeAddSongs> = [];

	querySnapshot.forEach((doc) => {
		const data: Omit<typeAddSongs, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
};

// aquí se crean las nuevas canciones favoritas
export const updateFavCancion = async (favSong: any) => {
	const userRef = doc(db, 'users', 'e14Adty5xAvKNl0ceGnc');
	await updateDoc(userRef, {
		fav_song: favSong,
	});
};

export default {
	// addFavCancion,
	getCreatedSongs,
	addSong,
};
