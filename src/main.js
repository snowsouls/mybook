import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import user from '@/store/index'
import utils from '@/util/index'

Vue.use(utils)

import { Button,Field,Cell,CellGroup,List,Skeleton,Toast,Overlay, RadioGroup, Radio, ActionSheet, DatetimePicker, Popup, Dialog, Area, PullRefresh, SwipeCell, Sticky, Image, ImagePreview, Loading, Switch, Checkbox, CheckboxGroup } from 'vant'
Vue.use(Button).use(Field).use(Cell).use(CellGroup).use(List).use(Skeleton).use(Toast).use(Overlay).use(ActionSheet).use(DatetimePicker).use(Popup).use(Dialog).use(Area)
Vue.use(Radio).use(RadioGroup).use(PullRefresh).use(SwipeCell).use(Sticky).use(Image).use(ImagePreview).use(Loading).use(Switch).use(Checkbox).use(CheckboxGroup)
// 将所有 Toast 的展示时长设置为 2000 毫秒
Toast.setDefaultOptions({ duration: 1500 });
Vue.prototype.$user = user.state.user.userMessage

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
