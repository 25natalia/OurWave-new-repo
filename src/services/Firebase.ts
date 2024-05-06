import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

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

export const getSongs = async () => {
	const arraySongs: any = [];

	const querySnapshot = await getDocs(collection(db, 'Songs'));
	querySnapshot.forEach((doc) => {
		arraySongs.push(doc.data());
	});
	return arraySongs;
};

