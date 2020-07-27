<template>
	<view style="height: 100rpx;"
	class="fixed-bottom flex align-center border-top bg-white">
		<input type="text" v-model="content" class="flex-1 rounded bg-light ml-2" style="padding: 5rpx;" placeholder="文明发言" @confirm="submit"/>
		<view class="iconfont icon-fabu flex align-center justify-center font-lg animated" hover-class="jello text-main" style="width: 100rpx;" @click="submit"></view>	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:""
			}
		},
		methods:{
			submit(){
				//是否为空
				if (this.content === '') {
					return uni.showToast({
						title: '消息不能为空',
						icon: 'none'
					});
				}
				this.$emit('submit',this.content)
				// 清空输入框
				this.content = ''
			}
		}
	}
</script>

<style>
</style>
