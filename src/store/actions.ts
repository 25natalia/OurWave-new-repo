import { getCreatedSongs, getUserCreatedSongs } from '../services/Firebase';

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

export const getMyUserSongs = async (idUser: string) => {
	const myUserSongs = await getUserCreatedSongs(idUser);
	return {
		action: 'GETMYUSERSONGS',
		payload: myUserSongs,
	};
};
