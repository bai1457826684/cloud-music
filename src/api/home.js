import { globalRequest } from '../common/request';

// 首页-发现
/**
 *
 * @param {Boolean} refresh 是否刷新数据,默认为 false
 * @param {any} cursor 上一条数据返回的 cursor
 * @returns
 */
export const homepageInfo = (data) => {
	return globalRequest('/homepage/block/page', 'GET', data);
};

// 首页-banner
/**
 *
 * @param {Boolean} type 是否刷新数据,默认为 false
 * @param {any} cursor 上一条数据返回的 cursor
 * @returns
 */
export const banner = (data) => {
	return globalRequest('/banner', 'GET', data);
};

// 首页-发现-圆形图标入口列表
export const homepageBall = (data) => {
	return globalRequest('/homepage/dragon/ball', 'GET');
};
