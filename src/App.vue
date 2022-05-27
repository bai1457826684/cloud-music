<script>
import { INIT_AUDIO } from './store/mutation-type';

export default {
	onLaunch: function () {
		console.log('App Launch');
		this.$store.commit(`${INIT_AUDIO}`);
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
};
</script>

<style>
/*每个页面公共css */
</style>
