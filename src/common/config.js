const getUrlConfg = () => {
	const config = {
		baseUrl: '',
		baseUrlOther: '',
	};
	if (process.env.NODE_ENV === 'development') {
		// config.baseUrl = 'http://localhost:3000';
		config.baseUrl = 'http://139.196.19.141:3000';

		config.baseUrlOther = 'http://139.196.19.141:3000';
		// config.baseUrlOther = 'https://netease-cloud-music-api-crete722p-hannah-bingo.vercel.app';
	} else {
		config.baseUrl = 'http://139.196.19.141:3000';

		config.baseUrlOther = 'http://139.196.19.141:3000';
		// config.baseUrlOther = 'https://netease-cloud-music-api-crete722p-hannah-bingo.vercel.app';
	}
	return config;
};

const config = getUrlConfg();

export default config;
