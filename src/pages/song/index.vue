<template>
	<view class="song">
		<template v-if="songs.length > 0">
			<view class="middle">
				<image class="pic" :src="songs[curIndex].al.picUrl" mode="scaleToFill"></image>
			</view>

			<view class="controls">
				<template v-if="innerAudioContext">
					<view class="controls-top">
						<view class="time">{{ secondToTime(currentTime) }}</view>
						<view class="process-box">
							<view class="process" :style="{ width: (currentTime / innerAudioContext.duration) * 100 + '%' }"></view>
						</view>
						<view class="time">{{ secondToTime(innerAudioContext.duration) }}</view>
					</view>
					<view class="controls-bottom">
						<view class="box">
							<view class="prev iconfont icon-prev"></view>
							<view class="play">
								<view v-show="!isPlay" class="iconfont icon-play" @click="play()"></view>
								<view v-show="isPlay" class="iconfont icon-pause" @click="pause()"></view>
							</view>
							<view class="next iconfont icon-prev"></view>
						</view>
					</view>
				</template>
			</view>
		</template>
	</view>
</template>

<script>
import { songDetail, songUrl } from '@/api/song.js';
import { PAUSE, PLAY } from '@/store/mutation-type';
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			// songs: [], // 歌曲信息
			// urls: [], // 歌曲url
			// curIndex: 0, // 当前歌曲索引
			// isPlay: false, // 是否正在播放
			// isCanPlay: false, // 是否可以播放
			// currentTime: 0, // 当前进度时间 s
			// // uni api 创建的音频上下文对象
			// innerAudioContext: null,
		};
	},

	computed: mapState({
		songs: (state) => state.song.songs,
		curIndex: (state) => state.song.curIndex,
		isPlay: (state) => state.song.isPlay,
		isCanPlay: (state) => state.song.isCanPlay,
		currentTime: (state) => state.song.currentTime,
		innerAudioContext: (state) => state.song.innerAudioContext,
	}),

	onLoad(options) {
		console.log(this.isCanPlay, this.innerAudioContext.src, this.currentTime, this.innerAudioContext.duration);
	},

	onUnload() {
		// this.innerAudioContext.destroy();
	},

	methods: {
		...mapMutations({
			play: PLAY,
			pause: PAUSE,
		}),

		// play() {
		// 	this.$store.commit(PLAY);
		// },

		getSong(ids) {
			return new Promise(async (resolve, reject) => {
				// 歌曲详情
				const resDetail = await songDetail({ ids: ids });
				if (resDetail.code === 200) {
					this.songs = resDetail.songs;
					// 歌曲 url
					const resUrl = await songUrl({ id: ids });
					if (resUrl.code === 200) {
						this.urls = resUrl.data;
						resolve(true);
					} else {
						uni.showToast({
							title: resUrl.message || 'fail',
						});
						resolve(false);
					}
				} else {
					uni.showToast({
						title: resDetail.message || 'fail',
					});
					resolve(false);
				}
			});
		},

		// play() {
		// 	this.innerAudioContext.play();
		// },

		// pause() {
		// 	this.innerAudioContext.pause();
		// },

		formatTime([s, m, h], format = 'hh:mm:ss') {
			if (h !== undefined || h !== null) {
				h = 0;
			}
			format = format.replace(/h+/g, h >= 10 ? h : '0' + h);
			format = format.replace(/m+/g, m >= 10 ? m : '0' + m);
			format = format.replace(/s+/g, s >= 10 ? s : '0' + s);
			return format;
		},

		secondToTime(second) {
			second = parseInt(second);
			let res = '';
			if (second > 3600) {
				const h = Math.floor(second / 3600);
				const m = Math.floor((second % 3600) / 60);
				const s = Math.floor((second % 3600) % 60);
				res = this.formatTime([s, m, h]);
			} else {
				const m = Math.floor(second / 60);
				const s = Math.floor(second % 60);
				res = this.formatTime([s, m], 'mm:ss');
			}
			return res;
		},
	},
};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
