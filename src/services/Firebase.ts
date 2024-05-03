const getSongs = async () => {
	try {
		const getData = await fetch('https://audiusproject.github.io/api-docs/#get-track').then((res) => res.json());
		console.log(getData);
		return getData;
	} catch (error) {
		console.error(error);
	}
};

export default getSongs;
