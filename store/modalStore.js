import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default function initModal(v) {
  // 挂载store到全局Vue原型上
  v.prototype.$modalStore = new Vuex.Store({
    state: {
		show:false,
		mask:true, //点击遮罩是否关闭弹窗
		title:"",
		content:'',
		showCancel:true,
		cancelText:"取消",
		cancelColor:"",
		confirmText:"确定",
		confirmColor:"",
		confirmAction:null,
		cancelAction:null,
    },
    mutations: {
		hideModal(state) {
			// 小程序导航条页面控制
			// #ifndef H5
			if(state.hideTabBar){
				uni.showTabBar();
			}
			// #endif
			state.show = false
		},
		showModal(state,data) {
			console.log(data);
			state = Object.assign(state,data)
			console.log(state);
			state.show = true
		},
		confirmAction(state) {
			let cb = state.confirmAction;
			cb && cb();
		},
		cancelAction(state) {
			let cb = state.cancel;
			cb && cb();
		}
    }
  })
  // 注册$showModal到Vue原型上，以方便全局调用
  v.prototype.$showModal = function (option) { 
	if (typeof option === 'object') {
		// #ifndef H5
		if(option.hideTabBar){
			uni.hideTabBar();
		}
		// #endif
		
		v.prototype.$modalStore.commit('showModal', option)
	}else{
		throw "配置项必须为对象传入的值为："+typeof option;
	}
  }
}