// 这里放公共方法

/**
 * 中文数量格式化 XX万 / XX亿
 * @param {Number} num 需要转换的数
 * @param {Number} fixed 保留小数位数 默认为0
 * @return {String} XX / XX万 / XX亿
 */
export const formatNumber = (num, fixed = 0) => {
	let res = num;
	let unit = '';

	if (num >= 10000 * 10000) {
		res = (num / (10000 * 10000)).toFixed(fixed);
		unit = '亿';
	} else if (num >= 10000) {
		res = (num / 10000).toFixed(fixed);
		unit = '万';
	} else {
		res = num.toFixed(fixed);
	}
	res = Number(res) + unit;

	return res;
};

/**
 * Scheme URL跳转方法
 * @param {String} url Scheme URL
 * @return {Boolean} 跳转状态
 */
export const openSchemeUrl = (url) => {
	if (!url || typeof url !== 'string') return false;

	// window.open(url, '_blank');
	window.location.href = url;
	return true;
};

/**
 * 获取区间值内的值， 注：最大最小值，最少传一个，不然调方法没有意义
 * @param {Number} number 要转的数值
 * @param {Number} [min=-Infinity] 最小值 默认负无穷
 * @param {Number} [max=Infinity] 最大值 默认正无穷
 * @return {Number} number
 */
export const getIntervalValue = (number, min, max) => {
	number = Math.max(number, min);
	number = Math.min(number, max);
	return number;
};

/**
 * 保留小数向下取小数
 * @param {Number} num 需要转换的数值
 * @param {Number} [fraction=2] 保留小数的位数（整数），默认为 2
 * @return {Number} Number
 */
export const floorToFixed = (num, fraction = 2) => Math.floor(num * Math.pow(10, fraction)) / Math.pow(10, fraction);
