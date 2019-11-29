import axios from '@/api/index'
import config from '@/config/index'

/**
 * 读取文章
 * userId     {string}     用户id
 */
const readArticleList = (count, page, id) => new Promise((resolve, reject) => {
    axios.get(config.serverUrl + '/index/index/readArticleList',{
        count,
        page,
        id
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
 * 点赞
 * typeId     {number} [require]        文章或者评论id
 * userId     {string} [require]        评论人id
 * type       {string}                  评论类型；1：文章,2：评论
 * likeNum     {number}                 当前点赞数
 */
const likeArticle = (typeId, userId, type='1', likeNum=0) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/index/likeArticle', {
        typeId,
        userId,
        type,
        likeNum
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
 * userId     {number} [require]        评论人id
 * name     {string} [require]        评论人名称
 * picture     {string} [require]        评论人照片
 * content     {string} [require]        评论内容
 */
const publishComment = (topicId, userId, name, picture, content) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/addComment', {
        topicId,
        userId,
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
 * commUserId      {number} [require]          评论的人id
 * commName         {string} [require]          评论人名称
 * content          {string} [require]          评论内容
 * replyId          {number}                    回复的id
 * replyUserId     {number}                    回复人id
 * replyName        {string}                    评论人名称
 */
const publishReply = (parentId, commUserId, commName, content, replyId, replyUserId, replyName) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/addReply', {
        parentId,
        commUserId,
        commName,
        content,
        replyId,
        replyUserId,
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
  likeArticle,
  publishComment,
  publishReply,
  register,
  login,
  isregister
}