import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import user from '@/store/index'
import utils from '@/util/index'
import FastClick from 'fastclick'
import config from '@/config/index'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(utils)
FastClick.attach(document.body)
Vue.use(preview, {
	loop: false,
	fullscreenEl: false
})

import { Button,Field,Cell,CellGroup,List,Skeleton,Toast,Overlay, RadioGroup, Radio, ActionSheet, DatetimePicker, Popup, Dialog, Area, PullRefresh, SwipeCell, Sticky, Image, ImagePreview, Loading, Switch, Checkbox, CheckboxGroup, Uploader } from 'vant'
Vue.use(Button).use(Field).use(Cell).use(CellGroup).use(List).use(Skeleton).use(Toast).use(Overlay).use(ActionSheet).use(DatetimePicker).use(Popup).use(Dialog).use(Area)
Vue.use(Radio).use(RadioGroup).use(PullRefresh).use(SwipeCell).use(Sticky).use(Image).use(ImagePreview).use(Loading).use(Switch).use(Checkbox).use(CheckboxGroup).use(Uploader)
// 将所有 Toast 的展示时长设置为 2000 毫秒
Toast.setDefaultOptions({ duration: 1500 });
Vue.prototype.$user = user.state.user.userMessage
Vue.prototype.$config = config

Vue.config.productionTip = false


router.beforeEach(function(to,from,next){
    document.title = to.meta.title || 'mybook'
    next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
