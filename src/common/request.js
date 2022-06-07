import { anonimousLogin } from '@/api/user';
import config from './config';

// uni.request({
//     url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
//     data: {
//         text: 'uni.request'
//     },
//     header: {
//         'custom-header': 'hello' //自定义请求头信息
//     },
//     success: (res) => {
//         console.log(res.data);
//         this.text = 'request success';
//     }
// });
// console.log(config);
export const globalRequest = (url, method, data, power) => {
	return new Promise((resolve, reject) => {
		uni
			.request({
				url: config.baseUrl + url,
				method,
				data: {
					...data,
					timestamp: Date.now(),
				},
				// dataType: ''
			})
			.then((response) => {
				console.log('response', response);
				const [, res] = response;
				if (res.statusCode === 400) {
					// 登陆验证
					anonimousLogin().then((res) => {
						if (res.code === 200) {
							console.log('login');
						}
					});
				}
				resolve(res.data);
			})
			.catch((err) => {
				console.log('err', err);
				reject(err);
			});
	});
};

export const otherRequest = (url, method, data, power) => {
	return new Promise((resolve, reject) => {
		uni
			.request({
				url: config.baseUrlOther + url,
				method,
				data,
				// dataType: ''
			})
			.then((response) => {
				const [, res] = response;
				resolve(res.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
