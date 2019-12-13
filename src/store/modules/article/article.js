import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// initial state
const state = {
    articleList: [],			// 首页文章列表
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}