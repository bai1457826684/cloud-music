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
							<view class="time">{{ secondToTime(currentTime) }}</view>
							<view class="process-box">
								<view class="process" :style="{ width: (currentTime / innerAudioContext.duration) * 100 + '%' }"></view>
							</view>
							<view class="time">{{ secondToTime(innerAudioContext.duration) }}</view>
						</view>
						<view class="controls-bottom">
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
import { PAUSE, PLAY, SONG_NEXT, SONG_PREV } from '@/store/mutation-types';
import { mapState, mapMutations } from 'vuex';
import Header from '@/components/header/index.vue';

export default {
	components: {
		Header,
	},

	data() {
		return {};
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
		console.log(this.currentTime, this.innerAudioContext.duration, this.innerAudioContext.src);
		// setInterval(() => {
		// }, 1000);
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
