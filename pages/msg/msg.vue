<template>
	<view>
		<!-- 消息列表 -->
		<template v-if="list.length>0">
			<block v-for="(item,index) in list" :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="flex text-center justify-center font-md border-bottom py-2" hover-class="bg-light"
			@click="popupEvent('friend')">
				<text class="iconfont icon-sousuo mr-2"></text>
				添加好友
			</view>
			<view class="flex text-center justify-center font-md py-2" hover-class="bg-light"
			@click="popupEvent('clear')">
				<text class="iconfont icon-shanchu mr-2"></text>
				清除列表
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const demo = [{
		avatar: "/static/default.jpg",
		username: "昵称",
		update_time: "1595554336",
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		username: "昵称",
		update_time: "1595554336",
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		username: "昵称",
		update_time: "1595554336",
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		username: "昵称",
		update_time: "1595554336",
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}];
	import msgList from '@/components/msg/msg-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	export default {
		components: {
			msgList,
			noThing,
			uniPopup
		},
		data() {
			return {
				list: []
			};
		},
		//页面加载
		onLoad() {
			this.list = demo;
		},
		//监听下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		//监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			// console.log(e.index)
			switch (e.index) {
				case 0: //左边
					uni.navigateTo({
						url:'../user-list/user-list'
					})
					this.$refs.popup.close();
					break;
				case 1: //右边
					this.$refs.popup.open();
					break;
			}
		},

		methods: {
			//下拉刷新
			refresh() {
				setTimeout(() => {
					this.list = demo;
					//停止下拉刷新
					uni.stopPullDownRefresh()
				}, 2000)
			},
			//弹出层选项点击事件
			popupEvent(e){
				switch(e){
					case 'friend':
					uni.navigateTo({
						url: '../search/search?type=user'
					});
						break;
					case 'clear':
					console.log('清除列表')
						break;
				}
				//关闭弹出层
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>
