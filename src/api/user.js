// 用户信息 api
import { globalRequest, otherRequest } from '../common/request';

/**
 * 游客登录
 * @returns
 */
export const anonimousLogin = () => {
	return globalRequest('/login', 'GET');
};
