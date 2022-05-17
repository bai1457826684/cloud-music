const getUrlConfg = () => {
	console.log(process.env);
	const config = {
		baseUrl: '',
	};
	if (process.env.NODE_ENV === 'development') {
		// config.baseUrl = 'http://localhost:3000';
		config.baseUrl = 'https://netease-cloud-music-api-crete722p-hannah-bingo.vercel.app';
	} else {
		config.baseUrl = 'https://netease-cloud-music-api-crete722p-hannah-bingo.vercel.app';
	}
	return config;
};

const config = getUrlConfg();

export default config;
