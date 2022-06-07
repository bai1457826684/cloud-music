<template>
	<view class="content">
		<view class="module">
			<!-- Header -->
			<Header></Header>

			<!-- banner -->
			<view class="banner">
				<swiper
					class="swiper"
					:indicator-dots="swiperOptions.indicatorDots"
					:autoplay="swiperOptions.autoplay"
					:interval="swiperOptions.interval"
					:duration="swiperOptions.duration"
				>
					<swiper-item v-for="banner in banners" :key="banner.bannerId" @click="clickBanner(banner)" class="swiper-item">
						<image :src="banner.pic" mode="widthFix"></image>
						<div class="title" :class="banner.titleColor" v-if="banner.typeTitle">{{ banner.typeTitle }}</div>
					</swiper-item>
				</swiper>
			</view>

			<!-- ball -->
			<view class="ball">
				<view class="item" v-for="item in ballList" :key="item.id" @click="$global.openSchemeUrl(item.url)">
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
						<span class="iconfont icon-arrow-right"></span>
					</view>
				</view>
				<view class="list">
					<SongSheet
						:url="item.picUrl"
						:playCount="item.playCount"
						:name="item.name"
						v-for="item in playList"
						:key="item.id"
						@click.native="clickSongSheet(item.id)"
					></SongSheet>
				</view>
			</view>
		</view>

		<!-- <view class="module">

    </view> -->
	</view>
</template>

<script>
import { banner, homepageBall, personalized } from '@/api/home.js';
import SongSheet from '@/components/song-sheet/index.vue';
import Header from '@/components/header/index.vue';

export default {
	components: {
		SongSheet,
		Header,
	},

	data() {
		return {
			swiperOptions: {
				indicatorDots: true,
				autoplay: true,
				interval: 54000,
				duration: 400,
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
		this.initPage();
	},

	onPullDownRefresh() {
		this.initPage();
		uni.stopPullDownRefresh();
	},

	methods: {
		initPage() {
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
			personalized({ limit: 10 }).then((res) => {
				if (res.code === 200) {
					this.playList = res.result;
				}
			});
		},

		// banner跳转
		clickBanner(banner) {
			console.log(banner);
			if (banner.targetType === 1 && banner.song) {
				this.$store.dispatch('playSong', banner.song);
				// return;
				uni.navigateTo({
					url: `/pages/song/index?ids=${banner.targetId}`,
				});
			}
		},

		// 歌单跳转
		clickSongSheet(id) {
			console.log(id);
			uni.navigateTo({
				url: `/pages/play-list/detail/index?id=${id}`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import './css/index.scss';
</style>
