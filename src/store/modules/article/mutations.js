/**
 * state:当前状态树
 * list: 提交matations时传的参数
 */
const matations = {
    // 文章列表
    setArticle(state, list) {
    	state.articleList = state.articleList.concat(list)
    },
    // 文章点赞
    setLike(state, obj) {
        state.articleList[obj.index]['likes'] = obj.likes
        state.articleList[obj.index]['isLike'] = obj.isLike
    },
    // 文章收藏
    setCollect(state, obj) {
        state.articleList[obj.index]["isCollect"] = obj.flag
    },
    // 发表文章
    addArticle(state, obj) {
        state.articleList.unshift(obj)
    },
    // 删除文章
    delateArticle(state, index) {
        state.articleList.splice(index, 1)
    }
}

export default matations
