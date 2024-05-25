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
