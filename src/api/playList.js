// 歌单 api
import { globalRequest } from '../common/request';

/**
 * 歌单详情
 * @param {String} id 歌单id
 * @param {String} [s=8] 歌单最近的 s 个收藏者,默认为 8
 * @return {Promise}
 */
export const playListDetail = ({ id, s }) => {
	return globalRequest('/playlist/detail', 'GET', { id, s });
};
