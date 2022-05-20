<template>
	<view class="cell">
		<image :src="url" mode=""></image>
		<!-- 右上角播放数 -->
		<view class="play-count">{{ playCount }}</view>
		<view class="name">{{ name }}</view>
	</view>
</template>

<script>
export default {
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

	onLoad() {},

	methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.cell {
	position: relative;
	width: 200rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	&::after {
		content: '';
		position: absolute;
		width: 150rpx;
		height: 150rpx;
		border-radius: 15rpx;
	}
	.play-count {
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		font-size: 24rpx;
		line-height: 30rpx;
		padding: 0 20rpx;
		color: #fff;
		border-radius: 15rpx;
		background-color: rgba($color: #fff, $alpha: 0.28);
	}
	image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 15rpx;
	}
	.name {
		font-size: 24rpx;
		line-height: 30rpx;
		color: #fff;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}
}
</style>
