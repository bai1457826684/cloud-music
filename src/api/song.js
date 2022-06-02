// 歌曲 api
import { globalRequest } from '../common/request';

/**
 * 歌曲详情
 * @param {String} ids 音乐 id, 如 ids=347230,347231
 * @returns 返回字段详情 https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e6%9b%b2%e8%af%a6%e6%83%85
 */
export const songDetail = ({ ids }) => {
	return globalRequest('/song/detail', 'GET', { ids });
};

/**
 * 获取歌曲url
 * @param {Number} id 音乐 id  如 id=347230,347231
 * @param {Number} [br=999000] 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * @returns 返回字段详情
 */
export const songUrl = (data) => {
	return globalRequest('/song/url', 'GET', data);
};
