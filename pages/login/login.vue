<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view>
			<view class="iconfont icon-guanbi flex align-center justify-center font-lg" style="width: 100rpx;height: 100rpx; position:fixed;left:0;"
			 hover-class="bg-light" :style="'top:'+statusBarHeight+'px;'" @click="back"></view>
		</view>

		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">{{status?'手机验证登录':'账号密码登录'}}</view>

		<view class="px-2">
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" placeholder="昵称/手机号/邮箱" class="border-bottom p-2"
					 v-model="username"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" placeholder="请输入密码" class="border-bottom p-2 flex-1" 
					v-model="password"/>
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">忘记密码？</view>
				</view>
			</template>
			
			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" placeholder="手机号" class="border-bottom p-2 flex-1" 
					v-model="phone"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" placeholder="请输入验证码" class="border-bottom p-2 flex-1" 
					v-model="code"/>
					<view class="border-bottom flex align-center justify-center font-sm text-white" style="width: 150rpx;"
					@click="getCode"
					:class="codeTime > 0?'bg-main-disabled':'bg-main'">{{codeTime > 0?codeTime+'s':'获取验证码'}}</view>
				</view>
			</template>
			
		</view>

		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary"
			:disabled="disabled" :class="disabled?'bg-main-disabled':'bg-main'"
			@click="submit">登录</button>
		</view>

		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-primary font-sm" @click="changeStatus">
				{{status?'账号密码登录':'手机号登录'}}
			</view>
			<text class="text-muted mx-2">|</text>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>

		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
		</view>
		<!-- 第三方登录 -->
		<other-login></other-login>
		<view class="flex align-center justify-center text-muted">
			注册即代表同意<text ckass="text-primary">《社区协议》</text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import otherLogin from '@/components/common/other-login.vue';
	export default {
		components: {
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				statusBarHeight: 0,
				status:false,
				username:"",
				password:"",
				phone:"",
				code:"",
				codeTime:0
			}
		},
		onLoad() {
			let {
				statusBarHeight
			} = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
		},
		computed:{
			disabled(){
				if((this.username === ''||this.password === '')&&(this.phone === ''||this.code === '')){
					return true
				}
				return false
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			//初始化表单
			initForm(){
				this.username = '',
				this.password = '',
				this.phone = '',
				this.code = ''
			},
			//切换登录方式
			changeStatus(){
				//初始化表单
				this.initForm();
				this.status = !this.status;
			},
			//获取验证码
			getCode(){
				//防止重复获取
				if(this.codeTime > 0){
					return;
				}
				//验证手机号
				if(!this.validate()) return;
				//倒计时
				this.codeTime = 30;
				let timer = setInterval(()=>{
					if(this.codeTime >= 1){
						this.codeTime--;
					}
					else{
						this.codeTime = 0;
						clearInterval(timer);
					}
				},1000)
			},
			//表单验证
			validate(){
				//手机号正则
				var mPattern = /^1[34578]\d{9}$/; 
				//输出 true
				if(!mPattern.test(this.phone)){
					uni.showToast({
						title: '手机号格式不正确',
						icon:'none'
					});
					return false;
				}
				//...更多验证
				return true;
			},
			//提交
			submit(){
				//表单验证
				if(!this.validate()) return;
				//提交后端
				//登陆成功处理
			}
		}
	}
</script>

<style>

</style>
