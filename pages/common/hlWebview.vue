<template>
	<view>
		<web-view :src="url" @message="message"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				url : '',
			}
		},
		onLoad(options) {
			console.log(options);
			this.url = options.url;
			if (options.encode) {
				this.url = decodeURIComponent(options.url);
			}
			let userInfo = this.$Storage.getUserInfo();
			if (!userInfo) {
				userInfo = {};
			}
			if (this.url.indexOf('mobile=') < 0 && this.url.indexOf('?') < 0) {
				this.url = `${this.url}?mobile=${userInfo.mobile}`
			}else if(this.url.indexOf('mobile=') < 0){
				this.url = `${this.url}&mobile=${userInfo.mobile}`
			}
			uni.setNavigationBarTitle({
				title:options.title
			})
		},
		message(e){
			
		}
		
	}
</script>

<style>
</style>
