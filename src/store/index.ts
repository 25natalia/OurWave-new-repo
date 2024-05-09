import { reducer } from './reducer';
import Storage from '../utils/storage';
import { PersistanceKeys } from '../utils/storage';

export let emptyState = {
	screen: 'REGISTER',
};

export let appState = Storage.get({ key: PersistanceKeys.STORE, defaultValue: emptyState });

//--//

let observers: any[] = [];

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;
	observers.forEach((o: any) => o.render());
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
