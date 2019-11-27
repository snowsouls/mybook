import axios from '@/api/index'
import config from '@/config/index'

/**
 * 读取文章
 */
const readArticleList = (count, page) => new Promise((resolve, reject) => {
    axios.get(config.serverUrl + '/index/index/readArticleList',{
        count,
        page
    }).then(res => {
        resolve(res)
    }).catch(err=>{
        reject(err)
    })
})

/**
 * 发布文章
 */
const publishArticle = (postbox, article, author, provenance) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/index/publishArticle', {
        postbox,
        article,
        author,
        provenance
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 删除文章
 * user     {string} [require]     登陆者邮箱
 * id     {number} [require]        文章id
 */
const deteleArticle = (user, id) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/index/deteleArticle', {
        user,
        id
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 进入详情
 * id     {number} [require]        文章id
 */
const getDetail = (id, page, count) => new Promise((resolve, reject) => {
    axios.get(config.serverUrl + '/index/detail/getDetail', {
        id,
        page,
        count
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 发表评论
 * topicId     {number} [require]        文章id
 * postbox     {string} [require]        评论人
 * name     {string} [require]        评论人名称
 * picture     {string} [require]        评论人照片
 * content     {string} [require]        评论内容
 */
const publishComment = (topicId, postbox, name, picture, content) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/addComment', {
        topicId,
        postbox,
        name,
        picture,
        content
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 发表回复
 * parentId         {number} [require]          评论的id
 * commPostbox      {string} [require]          评论的人
 * commName         {string} [require]          评论人名称
 * content          {string} [require]          评论内容
 * replyId          {number}                    回复的id
 * replyPostbox     {string}                    回复人
 * replyName        {string}                    评论人名称
 */
const publishReply = (parentId, commPostbox, commName, content, replyId, replyPostbox, replyName) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/addReply', {
        parentId,
        commPostbox,
        commName,
        content,
        replyId,
        replyPostbox,
        replyName
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 注册
 * data: {}  属性如下：
 * name     {string} [require]     昵称
 * postbox     {string} [require]     邮箱
 * picture     {string} [require]     照片
 * password     {string} [require]     密码
 * gender     {string}     性别 0:男，1：女
 * area     {string}        地址
 * birth     {string}        生日
 * signature     {string}        个性签名
 */
const register = (data) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/admin/index/register', data, {withCredentials: true}).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 登录
 */
const login = (postbox, password) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/admin/index/login', {
        postbox,
        password
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 验证邮箱是否已经注册
 */
const isregister = (postbox) => new Promise((resolve, reject) => {
    axios.get(config.serverUrl + '/admin/index/isregister', {
        postbox
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})



export {
  readArticleList,
  publishArticle,
  deteleArticle,
  getDetail,
  publishComment,
  publishReply,
  register,
  login,
  isregister
}