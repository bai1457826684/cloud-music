import { globalRequest } from '../common/request';

// 首页-发现-圆形图标入口列表
export const homepageBall = (data) => {
	return globalRequest('/homepage/dragon/ball', 'GET');
};
