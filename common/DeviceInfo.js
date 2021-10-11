

class DeviceInfo{
	
	constructor() {
	    this.platform = ''
		this.CustomBar = ''
		this.barHeight = ''
		this.deviceInfo = ''
	}
	
	getDeviceInfo(){
		uni.getSystemInfo().then((res)=>{
			if (res[1]) {
				let devices = res[1]
				this.deviceInfo = devices;
				this.barHeight = devices.statusBarHeight;
				this.CustomBar = devices.platform == 'android' ? devices.statusBarHeight + 50 : devices
					.statusBarHeight + 45;
				this.platform = devices.platform;
			}
		}).catch(e=>{
			console.log('获取出错');
			console.log(e);
		})
	}
	
	/**
	 * 获取状态栏高度，包括刘海
	 */
	// static getStatusBarHeight(){
	// 	let deviceInfo = uni.getSystemInfoSync();
	// 	let windowHeight = deviceInfo.windowHeight;
	// 	let screenHeight = deviceInfo.screenHeight;
	// 	let statusHeight = screenHeight - windowHeight;
	// 	return statusHeight;
	// }
	
}

let device = new DeviceInfo();
device.getDeviceInfo();

module.exports = device;

