<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//检测更新
			this.$U.update()
			//网络监听
			this.$U.onNetWork()
			//初始化数据
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 官方css库 */
	@import "./common/uni.css";
	/* 自定义图标库 */
	@import "./common/iconfont.css";
	/* 动画库 */
	@import "./common/animate.min.css";
	/* 自定义初始化样式库 */
	@import "./common/free.css";
	/* 全局样式库 */
	@import "./common/common.css";
</style>
