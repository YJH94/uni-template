
let _deviceInfo = null;

class DeviceInfo{
	
	static getDeviceInfo(callBack){
		if (_deviceInfo) {
			callBack && callBack(_deviceInfo);
			return _deviceInfo;
		}
		uni.getSystemInfo().then((res)=>{
			if (res[1]) {
				_deviceInfo = res[1];
				callBack && callBack(_deviceInfo);
				return _deviceInfo;
			}
		}).catch(e=>{
			console.log('获取出错');
			console.log(e);
			callBack && callBack()
			return null;
		})
	}
	
	/**
	 * 获取状态栏高度，包括刘海
	 */
	static getStatusBarHeight(){
		let deviceInfo = uni.getSystemInfoSync();
		let windowHeight = deviceInfo.windowHeight;
		let screenHeight = deviceInfo.screenHeight;
		let statusHeight = screenHeight - windowHeight;
		return statusHeight;
	}
	
}

DeviceInfo.getDeviceInfo();

module.exports = DeviceInfo;

