<template>
	<view>
		<input class="uni-input" type="text" placeholder="请输入你要绑定的邮箱"
		v-model="email">
		<input class="uni-input" type="text" placeholder="请输入密码"
		v-model="password">
		<view class="py-2 px-3">
			<button class="bg-main text-white border-0" style="border-radius: 50rpx;" type="primary"
			:disabled="disabled"
			:class="disabled?'bg-main-disabled':''"
			@click="submit">绑定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:"",
				password:""
			}
		},
		computed:{
			disabled(){
				return this.email == '' || this.password == '';
			}
		},
		methods: {
			check(){
				let rule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!rule.test(this.email)){
					uni.showToast({
						title:'邮箱格式不正确',
						icon:'none'
					})
					return false;
				}
				return true;
			},
			submit(){
				if(!this.check()){
					return;
				}
				console.log('提交成功')
			}
		}
	}
</script>

<style>

</style>
