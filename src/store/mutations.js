import * as types from './mutation-types'
/**
 * state:当前状态树
 * v: 提交matations时传的参数
 */
const matations = {
    // 个人信息
    [types.UESR_MESSAGE](state, v) {
    	if(v) {
    		state.userMessage = v
    	}
    	localStorage.setItem("mybook_user_msg", JSON.stringify(state.userMessage));
    },
    [types.UESR_LOGOUT](state, v) {
    	state.userMessage = {}
    	localStorage.removeItem("mybook_user_msg")
    },
}

export default matations
