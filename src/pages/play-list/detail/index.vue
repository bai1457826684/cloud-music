<template>
	<view class="detail">
		<Header :title="title" :class="{ hasBg: hasBg }"></Header>

		<view
			class="mask"
			:style="{
				backgroundImage: `url(${detail.coverImgUrl})`,
			}"
		></view>

		<!-- 歌单信息 -->
		<view class="top" ref="top">
			<view class="content">
				<view class="left">
					<SongSheet class="avatar" :url="detail.coverImgUrl" :playCount="detail.playCount" />
				</view>
				<view class="right">
					<view class="name">{{ detail.name }}</view>
					<view class="creator" v-if="detail.creator">
						<image class="avatar" :src="detail.creator.avatarUrl" mode="scaleToFill" />
						<text class="nick">{{ detail.creator.nickname }}</text>
					</view>
					<view class="desc-box">
						<span class="desc">{{ detail.description }}</span>
						<span class="iconfont icon-arrow-right"></span>
					</view>
				</view>
			</view>
		</view>

		<!-- list -->
		<view class="list">
			<!-- 播放全部 -->
			<view class="list-top">
				<view class="play" @click="playAll">
					<view class="icon">
						<span class="iconfont icon-play"></span>
					</view>
					<view>
						<span>播放全部</span>
						<span class="count">({{ list.length }})</span>
					</view>
				</view>
				<view class="right"></view>
			</view>
			<!-- 歌曲item -->
			<view class="item" v-for="(item, index) in list" :key="item.id" @click="playSong(item)">
				<view class="no" v-if="curSong.id === item.id">
					<span class="iconfont icon-yinpin"></span>
				</view>
				<view class="no" v-else>{{ index + 1 }}</view>
				<view class="info">
					<view class="name">{{ item.name }}</view>
					<view class="ar-name">{{ arName(item.ar) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { playListDetail } from '@/api/playList';
import { songDetail } from '@/api/song';
import Header from '@/components/header/index.vue';
import SongSheet from '@/components/song-sheet/index.vue';
import { mapGetters } from 'vuex';
import { PLAY, SET_SONGS } from '@/store/mutation-types';
let observer = null;

export default {
	components: {
		Header,
		SongSheet,
	},

	data() {
		return {
			title: '歌单',
			id: null,
			detail: {},
			list: [],
			trackIds: '',
			hasBg: false,
			// headerStyle: {
			//   backgroundColor: 'rgba()'
			// },
		};
	},

	computed: {
		...mapGetters(['curSong']),
	},

	onLoad(options) {
		const { id } = options;
		if (id) {
			this.id = id;
			this.initPage();
		}
	},

	mounted() {
		// 组件销毁前解除监听
		observer = new IntersectionObserver((entries) => {
			const { isIntersecting } = entries[0];
			// console.log('entries isIntersecting', isIntersecting);
			if (isIntersecting) {
				// true 可见
				this.hasBg = false;
			} else {
				// false 不可见
				this.hasBg = true;
			}
		});
		observer.observe(this.$refs.top.$el);
	},

	beforeDestroy() {
		// 解除监听
		if (observer) {
			observer.unobserve(this.$refs.top.$el);
			observer.disconnect();
		}
	},

	methods: {
		initPage() {
			playListDetail({ id: this.id }).then((res) => {
				if (res.code === 200) {
					this.detail = res.playlist;
					this.list = res.playlist.tracks;

					const trackIds = [];
					res.playlist.trackIds.forEach((item) => {
						trackIds.push(item.id);
					});
					this.trackIds = trackIds.join(',');

					this.getMoreSong();
				}
			});
		},

		// 获取歌单的所有歌曲信息
		getMoreSong() {
			songDetail({ ids: this.trackIds }).then((res) => {
				if (res.code === 200) {
					this.list = res.songs;
				}
			});
		},

		// 歌手名字
		arName(ar) {
			let name = [];
			for (const i in ar) {
				name.push(ar[i].name);
			}
			return name.join('/');
		},

		// 播放音乐
		playSong(item) {
			this.$store.dispatch('playSong', item);
			uni.navigateTo({
				url: `/pages/song/index?ids=${item.id}`,
			});
		},

		// 播放所有音乐
		playAll() {
			// this.$store.dispatch('playAllSong', this.list);
			this.$store.commit(SET_SONGS, this.list);
			this.$store.dispatch('playSong', this.list[0]);
			uni.navigateTo({
				url: `/pages/song/index`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.detail {
	min-height: 100vh;
	background-color: $uni-bg-color;

	.hasBg ::v-deep .box {
		// background-color: rgba($color: #151515, $alpha: 0.3);
		background-color: $uni-bg-color;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 400rpx;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		// backdrop-filter: blur(10rpx);
		filter: blur(100rpx);
	}

	// 歌单信息
	.top {
		position: relative;

		.content {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 40rpx 60rpx;
		}

		.right {
			margin-left: 20rpx;
			font-size: 20rpx;
			color: #ffffff;

			.name {
				font-size: 24rpx;
				margin-bottom: 20rpx;
				@include ellipsis(2);
			}

			.creator {
				display: flex;
				align-items: center;

				.avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					margin-right: 10rpx;
				}

				.nick {
					max-width: 240rpx;
					font-size: 18rpx;
					color: #eee;
					@include ellipsis(1);
				}
			}

			.desc-box {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
			}

			.desc {
				font-size: 18rpx;
				color: #eee;
				@include ellipsis(1);
			}

			.iconfont {
				font-size: 28rpx;
				color: #ffffff;
			}
		}
	}

	// 歌曲列表
	.list {
		position: relative;
		background-color: $uni-bg-color;
		padding: 20rpx 20rpx;

		&-top {
			position: sticky;
			top: $header-height;
			display: flex;
			align-items: center;
			padding: 20rpx;
			color: #ffffff;
			background-color: $uni-bg-color;

			.play {
				flex: 1;
				display: flex;
				align-items: center;
				font-size: 32rpx;

				.icon {
					width: 50rpx;
					height: 50rpx;
					font-size: 0;
					text-align: center;
					line-height: 50rpx;
					border-radius: 50%;
					background-color: #ff4c4c;
					margin-right: 20rpx;

					.icon-play {
						font-size: 24rpx;
						color: #ffffff;
					}
				}

				.count {
					font-size: 20rpx;
					color: #999;
					margin-left: 10rpx;
				}
			}

			.right {
				min-width: 100rpx;
			}
		}

		.item {
			display: flex;
			align-items: center;
			// justify-content: space-between;
			font-size: 24rpx;
			color: #ddd;
			line-height: 30rpx;
			padding: 14rpx 0;

			.no {
				text-align: center;
				width: 80rpx;

				.icon-yinpin {
					color: #ff4c4c;
					font-weight: bold;
				}
			}

			.info {
				width: 470rpx;

				.name {
					font-size: 28rpx;
					color: #ffffff;
					line-height: 36rpx;
				}

				.ar-name {
					font-size: 18rpx;
					color: #eee;
				}

				.name,
				.ar-name {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.iconfont {
				text-align: center;
				width: 40rpx;
				font-size: 32rpx;
			}
		}
	}
}
</style>
