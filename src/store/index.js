import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import article from './modules/article/article.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		user,
		article
	},
  	strict: debug
})
