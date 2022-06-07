export const browser = {
	versions: (function () {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			//移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
		};
	})(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase(),
};

// 用户端类型
export const phoneType = browser.versions.android ? 1 : browser.versions.iPhone ? 2 : browser.versions.iPad ? 3 : 0;

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
