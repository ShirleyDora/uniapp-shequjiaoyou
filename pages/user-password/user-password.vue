<template>
	<view>
		<input class="uni-input" type="text" value="" placeholder="输入旧密码" 
		v-model="oldpassword"/>
		<input class="uni-input" type="text" value="" placeholder="输入新密码" 
		v-model="newpassword"/>
		<input class="uni-input" type="text" value="" placeholder="输入确认密码"
		 v-model="renewpassword"/>
		<view class="py-2 px-3">
			<button class="bg-main text-white border-0" style="border-radius: 50rpx;" type="primary"
			:disabled="disabled"
			:class="disabled?'bg-main-disabled':''"
			@click="submit">设置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpassword:'',
				newpassword:'',
				renewpassword:''
			}
		},
		computed:{
			disabled(){
				return this.oldpassword == '' || this.newpassword == '' || this.renewpassword == '';
			}
		},
		methods: {
			//验证
			check(){
				if(this.newpassword !== this.renewpassword){
					uni.showToast({
						title: '两次密码不一致',
						icon:'none'
					});
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
