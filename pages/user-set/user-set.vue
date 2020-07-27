<template>
	<view>
		<uni-list-item title="账号与安全" @click="open('user-password')"></uni-list-item>
		<uni-list-item title="绑定邮箱" @click="open('user-email')"></uni-list-item>
		<uni-list-item title="资料编辑" @click="open('user-userinfo')"></uni-list-item>
		<uni-list-item title="清除缓存" @click="clear">
			<view slot="right" class="text-muted">
				{{currentSize | format}}
			</view>
		</uni-list-item>
		<uni-list-item title="意见反馈" @click="open('user-feedback')"></uni-list-item>
		<uni-list-item title="关于社区" @click="open('about')"></uni-list-item>
		<view class="py-2 px-3">
			<button class="bg-main text-white border-0" style="border-radius: 50rpx;" type="primary">退出登录</button>
		</view>
	</view>
</template>

<script>
	import uniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				currentSize: 0
			}
		},
		onLoad() {
			this.getStorageInfo()
		},
		filters:{
			format(value){
				return value > 1024? (value/1024).toFixed(2)+ 'MB':value.toFixed(2)+'KB';
			}
		},
		methods: {
			open(path) {
				uni.navigateTo({
					url: `../${path}/${path}`
				})
			},
			//得到缓存
			getStorageInfo(){
				let res = uni.getStorageInfoSync();
				this.currentSize = res.currentSize;
			},
			//清除缓存
			clear() {
				uni.showModal({
					title: '提示',
					content: '是否要清除所有缓存？',
					cancelText: '不清除',
					confirmText: '清除',
					success: res => {
						if(res.confirm){
							uni.clearStorage()
							this.getStorageInfo()
							uni.showToast({
								title:'清除成功',
								icon:'none'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>
