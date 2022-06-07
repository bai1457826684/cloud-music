// 路由拦截 添加
export const addRouterIntercept = () => {
	// navigateTo
	uni.addInterceptor('navigateTo', {
		success(args) {
			console.log('to');
			setTimeout(() => {
				uni.$emit('updateTitle');
			}, 0);
		},
	});

	// navigateBack
	uni.addInterceptor('navigateBack', {
		success(args) {
			console.log('back');
			setTimeout(() => {
				uni.$emit('updateTitle');
			}, 0);
		},
	});
};
