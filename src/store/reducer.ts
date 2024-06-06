export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case 'navigate':
			currentState.screen = payload;
			break;

		case 'SETUSER':
			currentState.userId = payload;
			break;

		case 'GETUSERSONGS':
			currentState.userSongs = payload;
			break;

		case 'GETMYUSERSONGS':
			currentState.myUserSongs = payload;
			break;

			case 'GETWAVES':
				currentState.waves = payload;
				break;
	}

	return currentState;
};
