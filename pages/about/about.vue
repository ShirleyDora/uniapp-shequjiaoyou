<template>
	<view>
		<view class="flex align-center justify-center flex-column pt-4 pb-3">
			<image src="../../static/common/nothing.png" style="width: 300rpx;height: 300rpx;" class="rounded-circle"></image>
			<text class="font text-muted mt-2">version 1.0.1</text>
		</view>
		<uni-list-item title="新版本检测"></uni-list-item>
		<uni-list-item title="社区用户协议"></uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
