
import { login } from '@/api/api'
import * as types from './mutation-types'

// initial state
const state = {
    userMessage: {}
}

// getters
const getters = {}

// actions
const actions = {
    submitLogin ({ commit }, obj) {
        return new Promise((resolve, reject)=> {
            login(obj.postbox, obj.password).then(res=>{
                if(res.status === 200) {
                    localStorage.setItem("mybook_user_msg", JSON.stringify(res.user))
                    commit(types.UESR_MESSAGE, res.user)
                    resolve()
                }
            }).catch(err=> {
                reject(err)
            })
        })
    }
}

// mutations
const mutations = {
    [types.UESR_MESSAGE] (state, user) {
        state.userMessage = user
    },
    logoutMsg (state, v) {
        state.userMessage = {}
        localStorage.removeItem("mybook_user_msg")
    }
}

// 保存到本地
if(!state.userMessage.postbox) {
    if (localStorage.getItem("mybook_user_msg")) {
        state.userMessage = JSON.parse(localStorage.getItem("mybook_user_msg"))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}