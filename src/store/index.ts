import { reducer } from './reducer';
import Storage from '../utils/storage';
import storage, { PersistanceKeys } from '../utils/storage';

export let emptyState = {
	screen: 'REGISTER',
};

export let appState = Storage.get({ key: PersistanceKeys.STORE, defaultValue: emptyState });

//--//

let observers: any[] = [];

const persistStore = (state: any) => storage.set({ key: PersistanceKeys.STORE, value: state, session: false });

const notifyObservers = () => observers.forEach((o: any) => o.render());

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	persistStore(newState);
	notifyObservers();
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
