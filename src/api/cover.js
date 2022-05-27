// 歌单 api
import { globalRequest } from '../common/request';

// 精选歌单
export const highquality = (data) => {
	return globalRequest('/top/playlist/highquality', 'GET', data);
};
