export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case 'navigate':
			currentState.screen = payload;
			break;

		case 'SETUSER':
			currentState.userId = payload;
			break;
	}

	return currentState;
};
