<template>
	<view class="content"> </view>
</template>

<script>
import { homepageBall } from '@/api/home.js';
export default {
	data() {
		return {
			title: 'Hello',
		};
	},
	onLoad() {
		homepageBall().then((res) => {
			console.log(res);
			if (res.code === 200) {
			}
		});
	},
	methods: {},
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
