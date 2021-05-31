import md5 from '../components/js_sdk/ccdzhang-dokey/md5.js'
import config from '@/app/config.js'

class Tool{
	
	static getPaySignStr(data){
		let dateTime = new Date().getTime();
		var stringA = "appId=" + data.appid +
		            "&nonceStr=" + data.nonce_str +
		            "&package=prepay_id=" + data.prepay_id +
		            "&signType=MD5" +
		            "&timeStamp=" + dateTime+'&key='+'d399844e7f1da09b3c0e595f8b372f29';
					console.log(stringA);
		let paySign = md5(stringA).toUpperCase();
		return paySign;
	}
	
	static showToast(title,callBack,duration=1500,mask=true,icon='none'){
		if (!title) {
			return;
		}
		uni.showToast({
			icon,
			duration,
			mask,
			icon,
			title,
			success() {
				setTimeout(function(){
					callBack && callBack()
				},duration)
			}
		})
	}
	
	getAddress() {
		let self = this;
		uni.getLocation({
			complete(e) {
				console.log(e);
				let info = {
					key: config.aMapKey,
					location: `${e.longitude},${e.latitude}`
				};
				uni.request({
					method: 'GET',
					data: info,
					url: 'https://restapi.amap.com/v3/geocode/regeo?parameters',
					success(res) {
						console.log(res);
					}
				});
			}
		});
	}
	
	static showModal({title = '提示',content,showCancel = false,okText = '确定',cancelText = '取消',okAction,cancelAction}){
		uni.showModal({
			title,
			content,
			showCancel,
			cancelText,
			confirmText:okText,
			success(res) {
				if (res.confirm) {
					okAction && okAction();
				}else if(res.cancel){
					cancelAction && cancelAction();
				}
			},
			fail(e) {
				console.log(e);
			}
		})
	}
	
	static cloneObj(obj){
		let newobj = obj.constructor === Array ? [] : {};
		if (typeof obj !== 'object') {
			return;
		}
		for (let i in obj) {
			newobj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
		}
		return newobj
	}
	
	static log(data){
		if (!config.showLog) {
			return;
		}
		try{
			console.log(JSON.parse(JSON.stringify(data)));
		}catch(e){
			console.log('出错===>>>');
			console.log(e);
			console.log(data)
		}
	}
}
module.exports = Tool;