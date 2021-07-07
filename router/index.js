
import {Storage} from 'hl-utils'

class  Router{
	/**
	 * 跳转前登陆判断
	 * @param {Object} url 跳转链接
	 */
	static jumpWithLogin(url){
		let userInfo = Storage.getUserInfo();
		if (userInfo && !userInfo.isVisiter && userInfo.huanxinId) {
			if (url) {
				uni.navigateTo({
					url
				})
			}
		}else{
			uni.navigateTo({
				url:'/pages/login/authorization',
				complete(e) {
					console.log(e);
				}
			})
		}
	}
	
	/**
	 * 跳转外部链接
	 * @param {Object} url
	 * @param {Object} title 标题
	 * @param {Object} needLogin 是否需要登录
	 */
	static jumpWebWithUrl (url, title='母子健康手册', needLogin = false) {
		let userInfo = Storage.getUserInfo();
		let interval = new Date().getTime();
		if (!url) {
			uni.showToast({
				title:'链接为空'
			})
			return;
		}
		// #ifndef H5
		url = url.replace('http://','https://')
		// #endif
		if (url.indexOf('mobile=') < 0 && url.indexOf('?') < 0) {
			url = `${url}?mobile=${userInfo.mobile}`
		}else if(url.indexOf('mobile=') < 0){
			url = `${url}&mobile=${userInfo.mobile}`
		}
		url = `${url}&v=${interval}`
		
		
		function realJump(){
			// #ifdef H5
			window.location.href = url;
			// #endif
			
			// #ifndef H5
			uni.navigateTo({ //iOS 中文链接显示不出来 默认转码
				url:`/pages/common/hlWebview?url=${encodeURIComponent(url)}&encode=true&title=${title}`,
				complete(e) {
					console.log(e);
				}
			})
			// #endif
		}
		
		if (!needLogin) {
			realJump();
		}else{
			if (userInfo && !userInfo.isVisiter && userInfo.huanxinId) {
				realJump();	
			}else{
				uni.navigateTo({
					url:'/pages/login/authorization',
					complete(e) {
						console.log(e);
					}
				})
			}
		}
	}
}

module.exports = Router;