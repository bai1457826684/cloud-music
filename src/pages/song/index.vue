<template>
	<view class="song">
		<!-- 背景模糊效果 -->
		<div class="mask" :style="{ backgroundImage: `url('${songs[curIndex].al.picUrl}')` }"></div>

		<div class="content">
			<!-- Header -->
			<Header>
				<template v-slot:navMiddle v-if="songs[curIndex]">
					<view class="info">
						<view class="song-name">{{ songs[curIndex].name }}</view>
						<view class="ar-name">{{ arName }}</view>
					</view>
				</template>
			</Header>

			<template v-if="songs[curIndex]">
				<view class="middle">
					<image class="pic" :class="[isPlay ? 'action' : '']" :src="songs[curIndex].al.picUrl" mode="scaleToFill"></image>
				</view>

				<view class="controls">
					<template v-if="innerAudioContext">
						<view class="controls-top">
							<!-- 时间、进度条 -->
							<view class="time">{{ secondToTime(currentTime) }}</view>
							<view
								ref="processBox"
								class="process-box"
								@touchstart="handleMouseDown"
								@touchend="handleMouseUp"
								@touchmove="handleMouseMove"
							>
								<!-- 进度条 拖动中 -->
								<view class="process active" v-show="processInfo.active" :style="{ width: processInfo.percent + '%' }"></view>
								<!-- 进度条 未拖动 -->
								<view
									class="process"
									v-show="!processInfo.active"
									:style="{ width: (currentTime / innerAudioContext.duration) * 100 + '%' }"
								></view>
							</view>
							<view class="time">{{ secondToTime(innerAudioContext.duration) }}</view>
						</view>
						<view class="controls-bottom">
							<!-- 上一首、播放、下一首 -->
							<view class="box">
								<view class="prev iconfont icon-prev" @click="songPrev"></view>
								<view class="play">
									<view v-show="!isPlay" class="iconfont icon-play" @click="play()"></view>
									<view v-show="isPlay" class="iconfont icon-pause" @click="pause()"></view>
								</view>
								<view class="next iconfont icon-prev" @click="songNext"></view>
							</view>
						</view>
					</template>
				</view>
			</template>
		</div>
	</view>
</template>

<script>
// import { songDetail, songUrl } from '@/api/song.js';
import { PAUSE, PLAY, SET_PROCESS, SONG_NEXT, SONG_PREV } from '@/store/mutation-types';
import { mapState, mapMutations } from 'vuex';
import Header from '@/components/header/index.vue';
import { floorToFixed, getIntervalValue } from '@/common/common';

export default {
	components: {
		Header,
	},

	data() {
		return {
			// 进度条拖动信息
			processInfo: {
				percent: 0,
				active: false,
				// 进度条宽度 单位(px)
				width: 0,
			},
		};
	},

	computed: {
		...mapState({
			songs: (state) => state.song.songs,
			curIndex: (state) => state.song.curIndex,
			isPlay: (state) => state.song.isPlay,
			isCanPlay: (state) => state.song.isCanPlay,
			currentTime: (state) => state.song.currentTime,
			innerAudioContext: (state) => state.song.innerAudioContext,
		}),

		arName: function () {
			if (!this.songs[this.curIndex]) return '';
			let names = [];
			const { ar } = this.songs[this.curIndex];
			for (const i in ar) {
				names.push(ar[i].name);
			}
			return names.join('/');
		},
	},

	onLoad(options) {
		// console.log(this.currentTime, this.innerAudioContext.duration, this.innerAudioContext.src);
	},

	onShow() {
		this.$nextTick(() => {
			// 获取进度条的宽度
			const { clientWidth } = this.$refs.processBox.$el;
			this.processInfo.width = clientWidth;
		});
	},

	onUnload() {
		// this.innerAudioContext.destroy();
	},

	methods: {
		...mapMutations({
			play: PLAY,
			pause: PAUSE,
			songPrev: SONG_PREV,
			songNext: SONG_NEXT,
		}),

		// 进度条 按下事件
		handleMouseDown(e) {
			const { currentTarget, changedTouches } = e;
			const { clientX } = changedTouches[0];
			const { offsetLeft } = currentTarget;
			this.processInfo.active = true;
			const percent = getIntervalValue(((clientX - offsetLeft) / this.processInfo.width) * 100, 0, 100);
			this.processInfo.percent = floorToFixed(percent);
		},

		// 进度条 移动
		handleMouseMove(e) {
			const { currentTarget, changedTouches } = e;
			const { clientX } = changedTouches[0];
			const { offsetLeft } = currentTarget;
			const percent = getIntervalValue(((clientX - offsetLeft) / this.processInfo.width) * 100, 0, 100);
			this.processInfo.percent = floorToFixed(percent);
		},

		// 进度条 松开
		handleMouseUp(e) {
			this.processInfo.active = false;
			const { currentTarget, changedTouches } = e;
			// 现在的位置
			const { clientX } = changedTouches[0];
			// 之前的位置
			const { offsetLeft } = currentTarget;
			const diff = clientX - offsetLeft;
			this.$store.commit(SET_PROCESS, (diff * this.innerAudioContext.duration) / this.processInfo.width);
		},

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
			second = isNaN(second) ? 0 : second;
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
