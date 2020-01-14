
import { readArticleList } from '@/api/api'
import config from '@/config/index'
/**
 * state:当前状态树
 * obj: 提交actions时传的参数
 */
const actions = {
    // 个人信息
    setArticle({ state, commit, rootState }, obj) {
    	return new Promise((resolve, reject)=> {
    		readArticleList(obj.count, obj.page, rootState.user.userMessage.id).then(res=>{
				res.data.forEach(item=>{
					item.user.picture = config.imagesUrl + item.user.picture	// 本地测试使用
				})
				commit('setArticle', {
					data: res.data,
					refresh: obj.refresh
				})
                resolve(res.has_more)
    		}).catch(err=> {
    			reject(err)
    		})
    	})
    }
}

export default actions
