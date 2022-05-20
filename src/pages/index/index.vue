<template>
	<view class="content">
		<view class="module">
			<!-- banner -->
			<view class="banner">
				<swiper
					class="swiper"
					:indicator-dots="swiperOptions.indicatorDots"
					:autoplay="swiperOptions.autoplay"
					:interval="swiperOptions.interval"
					:duration="swiperOptions.duration"
				>
					<swiper-item v-for="banner in banners" :key="banner.bannerId">
						<image :src="banner.pic" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- ball -->
			<view class="ball">
				<view class="item" v-for="item in ballList" :key="item.id">
					<view class="cell"><image :src="item.iconUrl" mode=""></image></view>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>

			<view class="line"></view>

			<!-- 推荐歌单 -->
			<view class="recommend">
				<view class="title">
					<view class="left">推荐歌单</view>
					<view class="right">
						<span>更多</span>
						<span class="icon"></span>
					</view>
				</view>
				<view class="list">
					<song-sheet :url="item.picUrl" :playCount="item.playCount" :name="item.name" v-for="item in playList" :key="item.id"></song-sheet>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { banner, homepageBall, personalized } from '@/api/home.js';
import songSheet from '@/components/song-sheet';

export default {
	components: {
		songSheet,
	},

	data() {
		return {
			swiperOptions: {
				indicatorDots: true,
				autoplay: true,
				interval: 10000,
				duration: 800,
			},
			// banner
			banners: [],
			// 球形入口
			ballList: [],
			// 推荐歌单
			playList: [],
		};
	},

	onLoad() {
		// banner
		banner({ type: this.$global.phoneType }).then((res) => {
			if (res.code === 200) {
				this.banners = res.banners;
			}
		});

		// 圆形图标列表
		homepageBall().then((res) => {
			if (res.code === 200) {
				this.ballList = res.data;
			}
		});

		// 推荐歌单
		personalized().then((res) => {
			if (res.code === 200) {
				this.playList = res.result;
			}
		});
	},

	methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
@import 'css/index.scss';
</style>
