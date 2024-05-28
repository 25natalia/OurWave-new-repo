import { initializeApp } from 'firebase/app';
import { getFirestore, updateDoc, onSnapshot } from 'firebase/firestore';
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { typeAddSongs } from '../types/songs';
import { waves } from '../types/waves';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
export const auth = getAuth(app);

let userId: string | null = null;

//registrar
export const createUser = (formData: any) => {
	createUserWithEmailAndPassword(auth, formData.email, formData.password)
		.then(async (userCredential) => {
			//Primer paso es obtener el id
			const user = userCredential.user;
			userId = user.uid;
			console.log(user.uid);

			//Segundo paso es agregar un documento con más info bajo ese id
			try {
				const where = doc(db, 'users', user.uid);
				const data = {
					id: user.uid,
					username: formData.username,
					completeName: formData.completeName,
				};
				console.log(data);
				await setDoc(where, data);
				alert('Se creó el usuario');
			} catch (error) {
				console.error(error);
			}
		})
		.catch((error: any) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error(errorCode, errorMessage);
		});
};

//loguear
export const logIn = (formData: any) => {
	console.log(formData);
	signInWithEmailAndPassword(auth, formData.email, formData.password)
		.then(async (userCredential) => {
			//Primer paso es obtener el id
			const user = userCredential.user;
			console.log(user.uid);
		})
		.catch((error: any) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error(errorCode, errorMessage);
		});
};

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
export const getUser = async (idUser: string) => {
	const docRef = doc(db, 'users', idUser);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
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

export const addWave = async (wave: Omit<waves, 'id'>) => {
	try {
		const where = collection(db, 'waves');
		await addDoc(where, wave);
		console.log('se añadió con éxito');
	} catch (error) {
		console.error(error);
	}
};

const getWave = async () => {
	const querySnapshot = await getDocs(collection(db, 'waves'));
	const transformed: Array<waves> = [];
	querySnapshot.forEach((doc) => {
		const data: Omit<waves, 'id'> = doc.data() as any;
		transformed.push({ id: doc.id, ...data });
	});

	return transformed;
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
	const userRef = doc(db, 'users');
	await updateDoc(userRef, {
		fav_song: favSong,
	});
};

export const getPostListener = (cb: (docs: waves[]) => void) => {
	const ref = collection(db, 'waves');
	onSnapshot(ref, (collection) => {
		const docs: waves[] = collection.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as waves[];
		cb(docs);
	});
};

export default {
	getCreatedSongs,
	addSong,
	addWave,
	getWave,
};
