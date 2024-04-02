interface DataShape {
	id: number;
	logo: string;
	perfil: string;
}

export const header: DataShape[] = [
	{
		id: 1,
		logo: 'https://i.pinimg.com/736x/4e/97/d6/4e97d610dfc03d8fde6969d5be6434f4.jpg',
		perfil:
			'<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" style="fill: rgba(46, 196, 182, 1);transform: ;msFilter:;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>',
	},
];
