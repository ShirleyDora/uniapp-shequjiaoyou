<template>
	<view>
		<!-- tab -->
		<view class="flex align-center py-2" style="height:100rpx;">
			<view class="flex-1 flex align-center justify-center"
			v-for="(item,index) in tabBars" :key="index"
			:class="index === tabIndex ? 'font-lg font-weight-bold text-main':'font-md'"
			@click="changeTab(index)">
			{{item.name}} <text v-if="item.num > 0" class="ml-2">{{item.num}}</text></view>
		</view>
		
		<!-- 列表 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab"
		:style="'height:'+scrollH+'px;'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'"
				@scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							
							<!-- 列表样式 -->
							<user-list :item="item2" :index="index2"></user-list>
							
							
						</block>
						<!-- 上拉加载 -->
						<load-more v-if="item.list.length >10"
						:loadmore="item.loadmore"></load-more>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
	</view>
</template>

<script>
	
	const demo = [{
		avatar:"/static/default.jpg",
		username:"昵称",
		sex:1, // 0未知，1女性，2男性
		age:24,
		isFollow:true
	},{
		avatar:"/static/default.jpg",
		username:"昵称",
		sex:2, // 0未知，1女性，2男性
		age:24,
		isFollow:false
	}];
	
	import loadMore from '@/components/common/load-more.vue';
	import noThing from '@/components/common/no-thing.vue';
	import userList from '@/components/user-list/user-list.vue';
	export default {
		components: {
			loadMore,
			noThing,
			userList
		},
		data() {
			return {
				// 列表高度
				scrollH:600,
				tabIndex:0,
				tabBars:[{
					name:"互关",
					num:0
				},{
					name:"关注",
					num:2
				},{
					name:"粉丝",
					num:30
				}],
				
				newsList:[]
			}
		},
		// 监听点击输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=user'
			});
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		},
		onLoad() {
			uni.getSystemInfo({
				success:res=>{
					this.scrollH = res.windowHeight - uni.upx2px(100)
				}
			})
			// 根据选项生成列表
			this.getData()
		},
		methods: {
			// 获取数据
			getData(){
				var arr = []
				for (let i = 0; i < this.tabBars.length; i++) {
					// 生成列表模板
					let obj = {
						// 1.上拉加载更多  2.加载中... 3.没有更多了
						loadmore:"上拉加载更多",
						list:[]
					}
					if (i < 2) {
						obj.list = demo
					}
					arr.push(obj)
				}
				this.newsList = arr
			},
			// tab切换
			changeTab(index){
				this.tabIndex = index
			},
			// 监听滑动
			onChangeTab(e){
				this.changeTab(e.detail.current)
			},
			// 上拉加载更多
			loadmore(index){
				// 拿到当前列表
				let item = this.newsList[index]
				// 判断是否处于可加载状态（上拉加载更多）
				if (item.loadmore !== '上拉加载更多') return;
				// 修改当前列表加载状态
				item.loadmore = '加载中...'
				// 模拟数据请求
				setTimeout(()=>{
					// 加载数据
					item.list = [...item.list,...item.list]
					// 恢复加载状态
					item.loadmore = '上拉加载更多'
				},10000)
			}
		}
	}
</script>

<style>

</style>
