import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import http from '@/api/index'

import { Button,Field,Cell,CellGroup,List,Skeleton,Toast,Overlay, RadioGroup, Radio, ActionSheet, DatetimePicker, Popup, Dialog, Area, PullRefresh } from 'vant'
Vue.use(Button).use(Field).use(Cell).use(CellGroup).use(List).use(Skeleton).use(Toast).use(Overlay).use(ActionSheet).use(DatetimePicker).use(Popup).use(Dialog).use(Area)
Vue.use(Radio).use(RadioGroup).use(PullRefresh)
// 将所有 Toast 的展示时长设置为 2000 毫秒
Toast.setDefaultOptions({ duration: 1500 });
Vue.prototype.$api = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
