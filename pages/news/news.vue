<template>
	<view>
		<!-- 导航 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @click-right="openAddInput">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<view class="mx-1" @click="changeTab(index)"
				v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-light-muted'">
					{{item.name}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>
		
		<swiper :current="tabIndex" :duration="150" :style="'height:'+scrollH+'px;'" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'"
				@scrolltolower="loadmoreEvent">
					<block v-for="(item,index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport"></common-list>
						<divider></divider>
					</block>
					<load-more :loadmore="loadmore"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light rounded flex align-center justify-center py-2 text-secondary" 
						@click="openSearch">
							<text class="iconfont icon-sousuo mr-2"></text>
							搜索话题
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
						<swiper-item>
							<image src="/static/demo/banner1.jpg" class="w-100 rounded" style="height: 300rpx;"></image>
						</swiper-item>
						<swiper-item>
							<image src="/static/demo/banner2.jpg" class="w-100 rounded" style="height: 300rpx;"></image>
						</swiper-item>
						<swiper-item>
							<image src="/static/demo/banner3.jpg" class="w-100 rounded" style="height: 300rpx;"></image>
						</swiper-item>
					</swiper>
					<divider></divider>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>
					
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
	</view>
</template>

<script>
	const demo = [{
		username:"昵称",
		userpic:"/static/default.jpg",
		newstime:"2020-07-23 下午04:30",
		isFollow:true,
		title:"我是标题",
		titlepic:"/static/demo/datapic/11.jpg",
		support:{
			type:"support", // 顶
			support_count:1,
			unsupport_count:2
		},
		comment_count:2,
		share_num:2
	},
	{
		username:"昵称",
		userpic:"/static/default.jpg",
		newstime:"2020-07-23 下午04:30",
		isFollow:true,
		title:"我是标题",
		titlepic:"",
		support:{
			type:"unsupport", // 踩
			support_count:1,
			unsupport_count:2
		},
		comment_count:2,
		share_num:2
	},
	{
		username:"昵称",
		userpic:"/static/default.jpg",
		newstime:"2020-07-23 下午04:30",
		isFollow:true,
		title:"我是标题",
		titlepic:"",
		support:{
			type:"", // 未操作
			support_count:1,
			unsupport_count:2
		},
		comment_count:2,
		share_num:2
	}];
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import hotCate from '@/components/news/hot-cate.vue';
	import topicList from '@/components/news/topic-list.vue';
	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data() {
			return {
				scrollH:500,
				tabIndex:0,
				tabBars:[{
					name:"关注"
				},{
					name:"话题"
				}],
				// 关注列表
				list:[],
				// 1.上拉加载更多  2.加载中... 3.没有更多了
				loadmore:"上拉加载更多",
				hotCate:[
					{
					    name: '关注',
					}, {
					    name: '推荐',
					}, {
					    name: '体育',
					}, {
					    name: '热点',
					}, {
					    name: '财经',
					}, {
					    name: '娱乐',
					}
				],
				topicList:[{
					cover:"/static/demo/topicpic/12.jpeg",
					title:"话题名称",
					desc:"话题描述",
					today_count:0,
					news_count:10
				},{
					cover:"/static/demo/topicpic/11.jpeg",
					title:"话题名称",
					desc:"话题描述",
					today_count:0,
					news_count:10
				},{
					cover:"/static/demo/topicpic/10.jpeg",
					title:"话题名称",
					desc:"话题描述",
					today_count:0,
					news_count:10
				},{
					cover:"/static/demo/topicpic/9.jpeg",
					title:"话题名称",
					desc:"话题描述",
					today_count:0,
					news_count:10
				},{
					cover:"/static/demo/topicpic/8.jpeg",
					title:"话题名称",
					desc:"话题描述",
					today_count:0,
					news_count:10
				}]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success:res=>{
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			// 加载测试数据
			this.list = demo
		},
		methods: {
			// 打开发布页
			openAddInput(){
				uni.navigateTo({
					url: '../add-input/add-input',
				});
			},
			// 切换选项卡
			changeTab(index){
				this.tabIndex = index
			},
			// 滑动
			onChangeTab(e){
				this.tabIndex = e.detail.current
			},
			// 顶踩操作
			doSupport(e){
				// 拿到当前对象
				let item = this.list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				// 之前没有操作过
				if (item.support.type === '') {
					item.support[e.type+'_count']++
				} else if (item.support.type ==='support' && e.type === 'unsupport') {
					// 顶 - 1
					item.support.support_count--;
					// 踩 + 1
					item.support.unsupport_count++;
				} else if(item.support.type ==='unsupport' && e.type === 'support'){ 					// 之前踩了
					// 顶 + 1
					item.support.support_count++;
					// 踩 - 1
					item.support.unsupport_count--;
				}
				item.support.type = e.type
				uni.showToast({ title: msg + '成功' });
			},
			// 上拉加载
			loadmoreEvent(){
				// 验证当前是否处于可加载状态
				if (this.loadmore !== '上拉加载更多') return;
				// 设置加载状态
				this.loadmore = '加载中...'
				// 模拟请求数据
				setTimeout(()=>{
					// 加载数据
					this.list = [...this.list,...this.list]
					// 设置加载状态
					this.loadmore = '上拉加载更多'
				},2000)
			},
			//打开搜索页
			openSearch(){
				uni.navigateTo({
					url: '../search/search?type=topic'
				});
			}
		}
	}
</script>

<style>

</style>
