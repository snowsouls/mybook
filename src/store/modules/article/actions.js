
import { readArticleList } from '@/api/api'
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
					// item.user.picture = item.user.picture.replace(/www\.mybook\.com/g, '192.168.1.94/tp5')	// 本地测试使用
					// item.longClick = false
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
