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
