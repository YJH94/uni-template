
let _userInfo = null;
let _babyInfo = null;

class StorageHelp {
	constructor(arg) {

	}

	static getUserInfo(callBack) {
		if (_userInfo) {
			callBack && callBack(_userInfo)
			return _userInfo;
		} else {
			let userInfo = StorageHelp.getInfo(StorageHelp.getUserKey());
			if (!userInfo) {
				userInfo = {};
			}
			_userInfo = userInfo;
			callBack && callBack(_userInfo);
			return userInfo;
		}
	}

	static saveUserInfo(userInfo, callBack) {
		StorageHelp.saveInfo(StorageHelp.getUserKey(), userInfo, function() {
			_userInfo = userInfo;
			callBack && callBack();

		})
	}

	static clearUserInfo(callBack) {
		_userInfo = null;
		StorageHelp.removeInfo(StorageHelp.getUserKey(),callBack);
	}

	static getUserKey() {
		return "USERINFO"
	}
	
	static getInfo(key, callBack) {
		let value = uni.getStorageSync(key);
		try{
			value = JSON.parse(value);
		}catch(e){
			//TODO handle the exception
		}
		
		callBack && callBack(value)
		return value;
	}

	static saveInfo(key, value, callBack) {
		let v = "";
		v = JSON.stringify(value);
		uni.setStorageSync(key, v);
		callBack && callBack();
	}

	static removeInfo(key, callBack) {
		uni.removeStorageSync(key);
		callBack && callBack();
	}

	static clear(callBack) {
		uni.clearStorage();
		callBack && callBack();
	}


}
StorageHelp.getUserInfo();

module.exports = StorageHelp;
