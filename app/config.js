/* 项目配置 */
let config = {
	version:'1.0.0',
	appName:'项目名称',
	
	isTracking:true,//是否埋点
	showLog:true,//是否显示log ，打包关闭
	
}

if (process.env.NODE_ENV === 'development') {//开发环境 (小程序不适用)
	config.url = "";
	// config.url = "http://crm1.heletech.cn:8083/API/Interface.aspx";
}else{//生产环境
	config.url = "";
	config.showLog = false;
}

export default config;