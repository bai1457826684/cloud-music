import { songUrl } from '@/api/song.js';
import {
	CHECK_SONG_URL,
	INIT_AUDIO,
	PAUSE,
	PLAY,
	PLAY_SONG,
	SET_AUDIO_URL,
	SET_SONGS,
	SONGS_DELETE,
	SONG_NEXT,
	SONG_PREV,
} from '../mutation-types';

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

	getters: {
		curSong(state) {
			return state.songs[state.curIndex] || {};
		},
	},

	mutations: {
		// 播放音乐
		[PLAY_SONG](state, payload) {
			const findIndex = state.songs.findIndex((item) => item.id === payload.id);
			console.log('findIndex', findIndex);
			if (findIndex === -1) {
				state.songs.splice(state.curIndex, 0, payload);
				this.commit(SET_SONGS, state.songs);
				// const { length } = state.songs;
				// state.curIndex = length - 1;
			} else {
				if (state.curIndex === findIndex) return;
				state.curIndex = findIndex;
			}
			this.commit(SET_AUDIO_URL);
		},

		// 设置音乐列表
		[SET_SONGS](state, list) {
			state.songs = list;
			sessionStorage.setItem('songs', JSON.stringify(state.songs));
		},

		// set url
		[SET_AUDIO_URL](state) {
			const song = state.songs[state.curIndex];
			if (song) {
				if (!song.url) {
					this.dispatch('playSong', song);
					return;
				}
				state.innerAudioContext.src = song.url;
			}
		},

		// 初始化音频，只在APP onLaunch 时调用一次
		[INIT_AUDIO](state) {
			if (!state.innerAudioContext) {
				state.innerAudioContext = uni.createInnerAudioContext();
				state.innerAudioContext.autoPlay = true;

				state.innerAudioContext.onPlay(() => {
					console.log('开始播放', state.innerAudioContext.src);
					this.commit(CHECK_SONG_URL);
					state.isPlay = true;
				});
				state.innerAudioContext.onPause(() => {
					console.log('暂停播放');
					state.isPlay = false;
				});
				state.innerAudioContext.onCanplay(() => {
					console.log('可以播放');
					state.isCanPlay = true;
					if (state.innerAudioContext.autoPlay) {
						state.innerAudioContext.play();
					}
				});
				state.innerAudioContext.onError((res) => {
					console.log('播放失败：', res);
					this.dispatch('getSongUrl', state.songs[state.curIndex].id).then((list) => {
						const { url } = list[0];
						if (!url) {
							uni.showToast({
								title: 'Invalid url',
								icon: 'none',
							});
							return;
						}
						if (url === state.songs[state.curIndex].url) {
							// url相同，歌曲不能播放，从列表中删除
							uni.showToast({
								title: '播放失败',
							});
							this.commit(SONGS_DELETE, { index: curIndex });
							this.commit(SET_AUDIO_URL);
						} else {
							// url不相同，歌曲url过期，修改url
							state.songs[state.curIndex].url = url;
							this.commit(SET_SONGS, state.songs);
							this.commit(SET_AUDIO_URL);
						}
					});
				});
				state.innerAudioContext.onTimeUpdate(() => {
					state.currentTime = state.innerAudioContext.currentTime;
				});
				state.innerAudioContext.onEnded(() => {
					console.log('播放结束');
					this.commit(SONG_NEXT);
					// innerAudioContext.src = state.urls[state.curIndex].url;
				});
			}
		},

		// 删除指定id / index歌曲
		[SONGS_DELETE](state, { id, index }) {
			if (id) {
				// state.songs = state.songs.filter((item) => id != item.id);
				for (const i in state.songs) {
					if (state.songs[i].id == id) {
						state.songs.splice(i, 1);
						if (state.curIndex > i) state.curIndex--;
						break;
					}
				}
			} else if (!isNaN(index)) {
				state.songs.splice(index, 1);
			}
			this.commit(SET_SONGS, state.songs);
			if (state.curIndex >= state.songs.length) {
				state.curIndex = 0;
			}
		},

		[PLAY](state) {
			if (!state.innerAudioContext.src) {
				this.commit(SET_AUDIO_URL);
			}
			state.innerAudioContext.play();
		},

		[PAUSE](state) {
			state.innerAudioContext.pause();
		},

		[SONG_NEXT](state) {
			state.curIndex++;
			const { length } = state.songs;
			state.curIndex %= length || 1;
			this.commit(SET_AUDIO_URL);
			console.log('next', state.curIndex);
		},

		[SONG_PREV](state) {
			state.curIndex--;
			const { length } = state.songs;
			if (state.curIndex < 0) {
				state.curIndex = length - 1;
			}
			this.commit(SET_AUDIO_URL);
			console.log('prev', state.curIndex);
		},
	},

	actions: {
		// 播放当前音乐
		playSong({ state, commit, dispatch }, payload) {
			if (payload.url || state.songs.some((item) => item.id === payload.id)) {
				commit(PLAY_SONG, payload);
			} else {
				dispatch('getSongUrl', payload.id).then((list) => {
					if (!list[0].url) {
						uni.showToast({
							title: 'Invalid url',
							icon: 'none',
						});
						return;
					}
					commit(PLAY_SONG, { ...payload, url: list[0].url });
				});
			}
		},

		// 播放所有音乐
		playAllSong({ state, commit, dispatch }, songList) {
			songList = JSON.parse(JSON.stringify(songList));
			let ids = [];
			for (const i in songList) {
				if (songList[i].id) {
					ids.push(songList[i].id);
				}
			}
			dispatch('getSongUrl', ids.join(',')).then((list) => {
				if (list) {
					list.forEach((item, index) => {
						if (item.id === songList[index].id) {
							songList.url = item.url;
							songList.br = item.br;
						} else {
							console.log('id匹配错误');
						}
					});
					state.curIndex = 0;
					commit(SET_SONGS, songList);
				}
			});
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
