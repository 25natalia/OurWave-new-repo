export enum PersistanceKeys {
	'STORE' = 'STORE',
}

const get = ({ key, defaultValue }: { key: PersistanceKeys; defaultValue: unknown }) => {
	const value = localStorage.getItem(key) || sessionStorage.getItem(key);
	return value ? JSON.parse(value) : defaultValue;
};

const set = ({ key, value, session = false }: { key: PersistanceKeys; value: unknown; session?: boolean }) => {
	const storage = session ? sessionStorage : localStorage;
	const parsed = JSON.stringify(value);
	storage.setItem(key, parsed);
};

export default {
	get,
	set,
};
