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
				<view class="list"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { banner, homepageBall } from '@/api/home.js';
export default {
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
		};
	},

	onLoad() {
		banner({ type: this.$global.phoneType }).then((res) => {
			console.log(res);
			if (res.code === 200) {
				this.banners = res.banners;
			}
		});

		homepageBall().then((res) => {
			console.log(res);
			if (res.code === 200) {
				this.ballList = res.data;
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
