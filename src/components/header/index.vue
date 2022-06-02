<template>
	<view class="header">
		<view class="box">
			<view class="left">
				<slot name="navLeft">
					<i class="iconfont icon-arrow-left" @click="$router.back()"></i>
				</slot>
			</view>

			<view class="middle">
				<slot name="navMiddle">
					<div class="title" v-if="title">{{ title }}</div>
				</slot>
			</view>

			<view class="right">
				<slot name="navRight">
					<i class="iconfont icon-mic"></i>
				</slot>
			</view>
		</view>

		<!-- 占位元素 -->
		<view class="placeholder"></view>
	</view>
</template>

<script>
export default {
	name: 'Header',

	props: {
		// 标题： 使用 navMiddle 插槽时 title 将会被覆盖
		title: {
			type: String,
			default: '',
		},
		// 自定义样式
		// headerStyle: {
		// 	type: Object,
		// 	default: () => {},
		// },
	},

	data() {
		return {};
	},

	created() {},

	methods: {},
};
</script>

<style lang="scss" scoped>
.header {
	color: #ffffff;

	.placeholder {
		height: $header-height;
	}

	.box {
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: $header-height;
		padding: 0 20rpx;
		box-sizing: border-box;
		z-index: 100;
		// background-color: ;

		.left,
		.right {
			width: 60rpx;
			text-align: center;
		}

		.title {
			font-size: 32rpx;
			font-weight: 600;
			line-height: 40rpx;
		}

		.iconfont {
			font-size: 40rpx;
			color: #ffffff;
		}
	}
}
</style>
