import { reducer } from './reducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/Firebase';
import { navigate } from './actions';
import { Screens } from '../types/navigation';
import { setUserCredentials } from './actions';
import { Observer } from '../types/store';

onAuthStateChanged(auth, (user) => {
	if (user) {
		user.uid !== null ? dispatch(setUserCredentials(user.uid)) : '';
		dispatch(navigate(Screens.HOME));
	} else {
		dispatch(navigate(Screens.LOGIN));
	}
});

export let emptyState = {
	screen: '',
	userId: '',
	userSongs: [],
	myUserSongs: [],
	waves: [],
	userWaves: [],
};

export let appState = emptyState;

let observers: any[] = [];

const notifyObservers = () => observers.forEach((o: any) => o.render());

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;
	notifyObservers();
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
