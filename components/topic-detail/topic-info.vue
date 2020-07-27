<template>
	<view>
		<view class="position-relative">
			<image :src="info.cover" mode="aspectFill" style="height: 300rpx;" class="w-100 filter"></image>
		</view>
		<view class="position-relative bg-white px-2 pb-2" style="z-index: 10;">
			<view class="flex">
				<image src="../../static/demo/topicpic/12.jpeg" style="height: 150rpx; width: 150rpx; margin-top: -75rpx;" class="rounded mr-2"></image>
				<text class="font-md">#{{info.title}}#</text>
			</view>
			<view class="flex align-center font text-secondary mt-1">
				<text class="mr-2">动态:{{info.news_count}}</text>
				<text>今日:{{info.today_count}}</text>
			</view>
			<view class="font-md text-secondary">{{info.desc}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info']
	}
</script>

<style>
	.filter{
		filter:blur(10px);
	}
</style>
