import { getCreatedSongs, getUserCreatedSongs, getWave, getUserWave } from '../services/Firebase';

export const navigate = (screen: any) => {
	return {
		action: 'navigate',
		payload: screen,
	};
};

export const setUserCredentials = (id: string) => {
	return {
		action: 'SETUSER',
		payload: id,
	};
};

export const getUserSongs = async () => {
	const userSongs = await getCreatedSongs();
	return {
		action: 'GETUSERSONGS',
		payload: userSongs,
	};
};

export const getWaves = async () => {
	const waves = await getWave();
	return {
		action: 'GETWAVES',
		payload: waves,
	};
};


export const getMyUserWave = async (idUser: string) => {
	const userWaves = await getUserWave(idUser);
	return {
		action: 'GETMYUSERWAVES',
		payload: userWaves,
	};
};

export const getMyUserSongs = async (idUser: string) => {
	const myUserSongs = await getUserCreatedSongs(idUser);
	return {
		action: 'GETMYUSERSONGS',
		payload: myUserSongs,
	};
};

