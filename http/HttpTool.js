
let typeEnum = {
	get: "GET",
	post: "POST",
	put: "PUT",
	delete: "DELETE"
}

let HttpTool = {};

function showToast(title, duration = 1500, mask = true, icon = "none") {
	uni.showToast({
		title,
		duration,
		mask,
		icon,
	})
}

function formdata(obj = {}) {
	let result = ''
	for (let name of Object.keys(obj)) {
		let value = obj[name];
		result +=
			'\r\n--XXX' +
			'\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
			'\r\n' +
			'\r\n' + value
	}
	return result + '\r\n--XXX--'
}

HttpTool.postFormData = function postFormData(url, param, showLoading = true) {
	let self = this;
	console.log(url);
	console.log(param);

	return new Promise((resolve, reject) => {
		showLoading && uni.showLoading({
			mask: true
		})
		
		function uploadAction(){
			uni.uploadFile({
				url,
				filePath: '',
				name: '',
				formData: {
					...param
				},
				...param
			}).then(res => {
				showLoading && uni.hideLoading();
				var uniJson = res[1];
				if (!uniJson) {
					console.log(res);
					reject(null, -999, "请求出错")
				}
				var json = uniJson["data"] ? uniJson["data"] : {};
				json = JSON.parse(json)
				var data = json["data"]
				var msg = json["msg"]
				var code = json["status"];
				console.log(json)
				if (parseInt(code) == 200) {
					resolve({
						data,
						json,
						code,
						msg
					});
				} else {
					if (parseInt(uniJson["statusCode"]) == 404) {
						showLoading && uni.showToast({
							title: "404 (Not Found)",
							duration: 2000,
							icon: "none"
						})
						code = 404;
						msg = "404 (Not Found)";
						showLoading && showToast(msg);
						reject({
							json,
							code,
							msg
						})
					} else {
						showLoading && showToast(msg);
						reject({
							json,
							code,
							msg
						})
					}
				}
			}).catch(error => {
				uni.hideLoading();
				showLoading && showToast('请求出错');
				reject({
					error,
					code: -999,
					msg: "请求出错"
				})
			})
		}
		
		// #ifdef H5
		
		if (param.filePath && param.name) {
			uploadAction();
		}else{
			uni.request({
				url:url,
				method:'POST',
				header: {
				        'content-type':'multipart/form-data; boundary=XXX'
				      },
				data:formdata(param),
				success(res) {
					resolve(res);
				},
				fail(e) {
					reject(e);
				}
			})
		}
		
		// #endif
		
		// #ifndef H5
		
		if (param.filePath && param.name) {
			uploadAction();
		}else{
			uni.request({
				url:url,
				method:'POST',
				header: {
				        'content-type':'multipart/form-data; boundary=XXX'
				      },
				data:formdata(param),
				success(res) {
					resolve(res);
				},
				fail(e) {
					reject(e);
				}
			})
		}
		
		// #endif
		
	})
}

Object.keys(typeEnum).forEach(type => {
	HttpTool[type] = function(url, param = {}, showLoading = true) {
		// url = config.url + url;
		return new Promise((resolve, reject) => {
			showLoading && uni.showLoading({
				mask: true,
				title:'请稍候'
			})
			uni.request({
				url,
				data: param,
				method: type,

			}).then(res => {
				showLoading && uni.hideLoading();
				var uniJson = res[1];
				if (!uniJson) {
					reject(null, -999, "请求出错")
				}
				var json = uniJson["data"] ? uniJson["data"] : {};
				var data = json["data"]
				var msg = json["msg"]
				var code = json["status"];
				if (parseInt(code) == 200) {
					resolve({
						data,
						json,
						code,
						msg
					});
				} else {
					if (parseInt(uniJson["statusCode"]) == 404) {
						uni.showToast({
							title: "404 (Not Found)",
							duration: 2000,
							icon: "none"
						})
						code = 404;
						msg = "404 (Not Found)";
						showLoading && showToast(msg);
						reject({
							json,
							code,
							msg
						})
					} else {
						showLoading && showToast(msg);
						reject({
							json,
							code,
							msg
						})
					}
				}
			}).catch(error => {
				uni.hideLoading();
				showLoading && showToast('请求出错');
				reject({
					error,
					code: -999,
					msg: "请求出错"
				})
			})
		})
	}
})



module.exports = HttpTool;
