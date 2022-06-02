<template>
	<view class="cell">
		<image :src="url" mode=""></image>
		<!-- 右上角播放数 -->
		<view class="play-count"><span class="iconfont icon-play"></span> {{ $global.formatNumber(playCount) }}</view>
		<view class="name" v-if="name">{{ name }}</view>
	</view>
</template>

<script>
export default {
	name: 'SongSheet',

	props: {
		url: {
			type: String,
			default: '',
		},
		playCount: {
			type: Number,
			default: 0,
		},
		name: {
			type: String,
			default: '',
		},
	},

	data() {
		return {};
	},

	created() {},

	methods: {},
};
</script>

<style lang="scss" scoped>
.cell {
	position: relative;
	width: 200rpx;
	font-size: 0;

	&::before {
		content: '';
		position: absolute;
		top: 0rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		// height: 90%;
		height: 150rpx;
		border-radius: 15rpx;
		background-color: #3e3e3e;
		overflow: hidden;
	}

	.play-count {
		position: absolute;
		right: 6rpx;
		top: 10rpx;
		font-size: 20rpx;
		line-height: 30rpx;
		padding: 0 20rpx;
		color: #fff;
		border-radius: 15rpx;
		background-color: rgba($color: #fff, $alpha: 0.28);

		.icon-play {
			font-size: 20rpx;
			margin-right: 8rpx;
		}
	}

	image {
		width: 200rpx;
		height: 200rpx;
		margin-top: 6rpx;
		border-radius: 15rpx;
	}

	.name {
		font-size: 24rpx;
		line-height: 30rpx;
		height: 60rpx;
		color: #fff;
		margin-top: 14rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}
}
</style>
