import Vue from 'vue'
import App from './App'
import {HttpTool,Storage,HLTool,DateUtils} from 'hl-utils'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import API from '@/http/API.js'
import hlDatePicker from '@/pages/common/hlDatePickerView.vue'
import hlPicker from '@/pages/common/hlPickerView.vue'
import initModal from '@/store/modalStore.js'
import hlModal from '@/pages/common/hlModal.vue'
initModal(Vue)

Vue.config.productionTip = false
Vue.prototype.$HttpTool = HttpTool;
Vue.prototype.$Storage = Storage;
Vue.prototype.$HLTool = HLTool;
Vue.prototype.$HLAPI = API;
Vue.prototype.$DateUtils = DateUtils;
Vue.prototype.log = HLTool.log;

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('hl_datepicker', hlDatePicker)
Vue.component('hl_picker', hlPicker)
Vue.component('hl_modal', hlModal)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
