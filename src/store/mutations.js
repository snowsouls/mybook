import * as types from './mutation-types'
/**
 * state:当前状态树
 * v: 提交matations时传的参数
 */
const matations = {
    // 个人信息
    [types.UESR_MESSAGE](state, v) {
        state.userMessage = v
    },
}

export default matations
