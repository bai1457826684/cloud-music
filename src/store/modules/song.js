import { songUrl } from '@/api/song.js';
import { INIT_AUDIO, PAUSE, PLAY, PLAY_SONG } from '../mutation-type';

// 歌曲 store
const store = {
	state: {
		songs: JSON.parse(sessionStorage.getItem('songs')) || [], // 歌曲信息
		// urls: [], // 歌曲url
		curIndex: 0, // 当前歌曲索引
		isPlay: false, // 是否正在播放
		isCanPlay: false, // 是否可以播放
		currentTime: 0, // 当前进度时间 s

		// uni api 创建的音频上下文对象
		innerAudioContext: null,
	},

	getters: {},

	mutations: {
		// 播放音乐
		[PLAY_SONG](state, payload) {
			state.songs.push(payload);
			sessionStorage.setItem('songs', JSON.stringify(state.songs));
			const { length } = state.songs;
			state.curIndex = length - 1;
			state.innerAudioContext.src = payload.url;

			// if (!state.isPlay && state.isCanPlay) {
			// 	state.innerAudioContext.play();
			// }
		},

		[INIT_AUDIO](state) {
			if (!state.innerAudioContext) {
				state.innerAudioContext = uni.createInnerAudioContext();
				state.innerAudioContext.autoPlay = true;

				state.innerAudioContext.onPlay(() => {
					console.log('开始播放');
					state.isPlay = true;
				});
				state.innerAudioContext.onPause(() => {
					console.log('暂停播放');
					state.isPlay = false;
				});
				state.innerAudioContext.onCanplay(() => {
					console.log('可以播放');
					state.isCanPlay = true;
					if (state.innerAudioContext.autoPlay && !state.isPlay) {
						state.innerAudioContext.play();
					}
				});
				state.innerAudioContext.onError((res) => {
					console.log('播放失败：', res);
					console.log(res.errMsg);
				});
				state.innerAudioContext.onTimeUpdate(() => {
					state.currentTime = state.innerAudioContext.currentTime;
				});
				state.innerAudioContext.onEnded(() => {
					console.log('播放结束');
					// innerAudioContext.src = state.urls[state.curIndex].url;
				});
			}
		},

		[PLAY](state) {
			if (!state.innerAudioContext.src) {
				state.innerAudioContext.src = state.songs[state.curIndex].url;
			}
			state.innerAudioContext.play();
		},

		[PAUSE](state) {
			state.innerAudioContext.pause();
		},
	},

	actions: {
		// 播放当前音乐
		playSong({ state, commit, dispatch }, payload) {
			if (payload.url) {
				commit(PLAY_SONG, payload);
			} else {
				// state.innerAudioContext.src = payload.url;
				dispatch('getSongUrl', payload.id).then((list) => {
					payload.url = list[0].url;
					commit(PLAY_SONG, payload);
				});
			}
		},

		getSongUrl({ state }, ids) {
			return new Promise((resolve, reject) => {
				songUrl({ id: ids })
					.then((res) => {
						if (res.code === 200) {
							resolve(res.data);
						} else {
							reject(null);
						}
					})
					.catch(() => {
						reject(null);
					});
			});
		},
	},
};

export default store;
