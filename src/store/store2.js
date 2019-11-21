import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		information: {},
		person: {
			name: 'LoveT',
			postbox: 'babyqcwr@126.com',
			gender: '0',
			area: '湖北省-十堰市-郧阳区',
			areaCode: '420304',
			birth: '1992-09-03',
			signature: '心之所向，素履以往；生如逆旅，一苇以航'
		}
	},
	mutations: {
		changeMsg(state) {
			state.information = { ...state.person }
		}
	},
	actions: {

	}
})
