export const navigate = (screen: any) => {
	return {
		action: 'navigate',
		payload: screen,
	};
};

export const setUserCredentials = (id: string) => {
	console.log(id);
	return {
		type: 'SETUSER',
		payload: id,
	};
};
