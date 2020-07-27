<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- 搜索历史 -->
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" 
				v-for="(item,index) in list" :key="index"
				hover-class="bg-light"
				@click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<template v-else>
			<!-- 数据列表 -->
			<block v-for="(item,index) in searchList" :key="index">
				<template v-if="type ==='post'">
					<!-- 帖子 -->
					<common-list :item="item" :index="index"></common-list>
				</template>
				<template v-else-if="type === 'topic'">
					<!-- 话题 -->
					<topic-list :item="item" :index="index"></topic-list>
				</template>
				<template v-else>
					<!-- 用户 -->
					<user-list :item="item" :index="index"></user-list>
				</template>
			</block>
		</template>
		
	</view>
</template>

<script>
	// 测试数据
	const demo1 = [{
		username:"昵称",
		userpic:"/static/default.jpg",
		newstime:"2020-07-25 上午08:57",
		isFollow:false,
		title:"我是标题",
		titlepic:"/static/demo/datapic/1.jpg",
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
		newstime:"2020-07-25 上午08:57",
		isFollow:false,
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
		newstime:"2020-07-25 上午08:57",
		isFollow:false,
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
	
	const demo2 = [{
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
				}];
	const demo3 = [{
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
	import commonList from '@/components/common/common-list.vue';
	import topicList from '@/components/news/topic-list.vue';
	import userList from '@/components/user-list/user-list.vue';
	export default {
		components: {
			commonList,
			topicList,
			userList
		},
		data() {
			return {
				searchText:"",
				list:['uni-app-hello','uni-app-vue','实战教程','系列教程'],
				// 搜索结果
				searchList:[],
				// 当前搜索类型
				type:"post"
			}
		},
		// 监听导航输入
		onNavigationBarSearchInputChanged(e){
			this.searchText = e.text
		},
		// 监听点击导航搜索按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent()
			}
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (this.type){
				case 'post':
				pageTitle = '帖子'
					break;
				case 'topic':
				pageTitle = '话题'
					break;
				case 'user':
				pageTitle = '用户'
					break;
			}
			// 修改搜索占位
			// #ifdef APP-PLUS
			//获取当前窗口对象实例
			let currentWebview = this.$mp.page.$getAppWebview();
			//获取当前窗口的原生导航栏
			let tn = currentWebview.getStyle().titleNView; 
			tn.searchInput.placeholder = '搜索'+pageTitle; 
			currentWebview.setStyle({
				titleNView: tn  
			})
			// #endif
		},
		methods: {
			// 点击搜索历史
			clickSearchHistory(text){
				this.searchText = text
				this.searchEvent()
			},
			// 搜索事件
			searchEvent(){
				// 收起键盘
				uni.hideKeyboard()
				// 显示loading状态
				uni.showLoading({
					title: '加载中...',
					mask: false
				})
				// 请求搜索
				setTimeout(()=>{
					switch (this.type){
						case 'post':
						this.searchList = demo1
							break;
						case 'topic':
						this.searchList = demo2
							break;
						case 'user':
						this.searchList = demo3
							break;
					}
					// 隐藏loading
					uni.hideLoading()
				},3000)
			}
		}
	}
</script>

<style>

</style>
