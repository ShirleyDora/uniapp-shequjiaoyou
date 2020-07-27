<template>
	<view class="flex align-center p-2 border-bottom border-light-secondary animate__animated animate__fast animate__fadeIn" hover-class="bg-light"
	@click="openUserchat">
		<image :src="item.avatar" class="rounded-circle mr-2" style="height: 80rpx;width: 80rpx;"></image>
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<text class="font-md">{{item.username}}</text>
				<text class="font-sm text-secondary">{{item.update_time | formatTime}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="text-secondary text-ellipsis" style="max-width: 500rpx;">{{item.data}}</text>
				<uni-badge :text="item.noread" type="error"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue';
	import $T from '@/common/time.js';
	export default{
		props:{
			item:Object,
			index:Number
		},
		components:{
			uniBadge
		},
		//过滤器
		filters:{
			formatTime(value){
				return $T.gettime(value);
			}
		},
		methods:{
			openUserchat(){
				uni.navigateTo({
					url:"../../pages/user-chat/user-chat"
				})
			}
		}
	}
</script>

<style>
</style>
