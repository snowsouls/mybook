
import { login } from '@/api/api'

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
                    commit('userLogin', res.user)
                    resolve(res.user)
                }
            }).catch(err=> {
                reject(err)
            })
        })
    }
}

// mutations
const mutations = {
    userLogin (state, user) {
        if(user) {
            state.userMessage = user
        }
    },
    userLogout (state) {
        state.userMessage = {}
        localStorage.removeItem("mybook_user_msg")
    },
    updateUser(state, obj) {
        state.userMessage[obj.name] = obj.value
        localStorage.setItem("mybook_user_msg", JSON.stringify(state.userMessage));
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