import VConsole from 'vconsole';

const getParams = () => {
	const params = {};
	const { href } = window.location;
	const str = href.split('?')[1];
	if (!str) return params;

	const arr = str.split('&');
	for (const i in arr) {
		const [key, val] = arr[i].split('=');
		params[key] = val;
	}
	return params;
};

export default {
	use() {
		if (process.env.NODE_ENV === 'production') {
			const params = getParams();
			if (params.test) {
				new VConsole();
			}
		}
	},
};
