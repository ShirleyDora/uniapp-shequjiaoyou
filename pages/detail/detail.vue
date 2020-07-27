<template>
	<view>
		<!-- 帖子详情页详细信息 -->
		<common-list :item="info" isdetail 
		@follow="follow"
		@doSupport="doSupport"
		@doComment="doComment" @doShare="doShare">
			<view>{{info.content}}</view>
			<view>
				<image v-for="(item,index) in info.images" :key="index" @click="preview(index)"
				:src="item.url" class="w-100" mode="widthFix"></image>
			</view>
		</common-list>
		
		<divider></divider>
		<view class="p-2 font-md font-weight-bold">
			最新评论 3
		</view>
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>小猫咪</text>
					</view>
					<view class="uni-comment-content">支持国产，支持DCloud!</view>
					<view class="uni-comment-date">
						<view>2天前</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input @submit="submit"></bottom-input>
		
		<more-share ref="share"></more-share>
		
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	import moreShare from '@/components/common/more-share.vue';
	export default {
		components: {
			commonList,
			bottomInput,
			moreShare
		},
		data() {
			return {
				//当前帖子信息
				info:{
					username:"昵称",
					userpic:"/static/default.jpg",
					newstime:"2020-07-20 下午04:30",
					isFollow:false,
					title:"太完美主义降低了做事效率怎么办？",
					titlepic:"/static/demo/datapic/1.jpg",
					support:{
						type:"support", // 顶
						support_count:1,
						unsupport_count:2
					},
					comment_count:2,
					share_num:2,
					content:"题记：当我们说完美主义降低了做事效率时，通常有两个问题：1.因为过于追求完美，把事情想得很复杂而迟迟不愿意开始行动，导致拖延。2.因为追求全部的完美，在不影响大局的细节上过多纠结，反而影响事情的闭环和整体效率。解决方法：1.用'无所得心'做简单的事，解决拖延。2.用全局观+迭代思维提高整体效率。",
					images:[{
						url:"/static/demo/datapic/41.jpg"
					},{
						url:"/static/demo/datapic/38.jpg"
					}]
				}
			}
		},
		onLoad(e) {
			// 初始化
			if (e.detail) {
				this.__init(JSON.parse(e.detail))
			}
		},
		computed: {
			imagesList() {
				return this.info.images.map(item=>item.url) 
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.share.open()
		},
		onBackPress() {
			this.$refs.share.close()
		},
		methods: {
			__init(data){
				// 修改标题
				uni.setNavigationBarTitle({
					title:data.title
				})
				// 请求api
			},
			// 点击评论
			doComment(){
				
			},
			// 点击分享
			doShare(){
				
			},
			// 关注
			follow(){
				this.info.isFollow = true
				uni.showToast({
					title: '关注成功'
				});
			},
			// 顶踩操作
			doSupport(e){
				let item = this.info;
				let msg = e.type === 'support' ?'顶':'踩'
				//之前操作过
				if(item.support.type === e.type){
					return uni.showToast({
						title:'你已经操作过了',
						icon:'none'
					})
				}
				//之前没有操作过
				if(item.support.type === ''){
					item.support[e.type+'_count']++
				}else if (item.support.type ==='support' && e.type === 'unsupport') {
					// 顶 - 1
					item.support.support_count--;
					// 踩 + 1
					item.support.unsupport_count++;
				} else if(item.support.type ==='unsupport' && e.type === 'support'){
					// 顶 + 1
					item.support.support_count++;
					// 踩 - 1
					item.support.unsupport_count--;
				}
				item.support.type = e.type
				uni.showToast({ title: msg + '成功' });
			},
			// 预览图片
			preview(index){
				// 预览图片
				uni.previewImage({
					current:index,
					urls:this.imagesList
				});
			},
			// 提交评论
			submit(data){
				console.log(data);
			}
		}
	}
</script>

<style>

</style>
