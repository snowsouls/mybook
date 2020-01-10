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
const publishArticle = (userId, article, author, provenance) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/index/publishArticle', {
        userId,
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
 * 文章点赞
 * typeId     {number} [require]        文章id
 * userId     {string} [require]        评论人id
 * likeNum     {number}                 当前点赞数
 */
const likeArticle = (typeId, userId, type='1', likeNum=0) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/index/likeArticle', {
        typeId,
        userId,
        likeNum
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 文章收藏
 * userId     {string} [require]        评论人id
 * id         {number} [require]        文章id
 */
const collect = (userId, id) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/index/collect', {
        userId,
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
 * page     {number} [require]        第几页
 * count     {number}               每页条数
 * userId     {number}             userid
 */
const getDetail = (id, page, count, userId) => new Promise((resolve, reject) => {
    axios.get(config.serverUrl + '/index/detail/getDetail', {
        id,
        page,
        count,
        userId
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
 * 删除评论
 * id     {number} [require]        评论id
 */
const delateReply = (id) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/delateReply', {
        id
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
 * 评论点赞
 * typeId     {number} [require]        评论id
 * userId     {string} [require]        评论人id
 * likeNum     {number}                 当前点赞数
 */
const likeComment = (typeId, userId, likeNum=0) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/likeComment', {
        typeId,
        userId,
        likeNum
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
    axios.post(config.serverUrl + '/index/user/register', data, {withCredentials: true}).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})
/**
 * 登录
 */
const login = (postbox, password) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/user/login', {
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
    axios.get(config.serverUrl + '/index/user/isregister', {
        postbox
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 我的文章
 * userId     {string} [require]        userid
 * page     {number} [require]          第几页
 * count     {number}                   每页数量
 */
const getPublish = (userId, page, count=10) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/my/getPublish', {
        userId,
        page,
        count
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 我的收藏
 * userId     {string} [require]        userid
 * page     {number} [require]          第几页
 * count     {number}                   每页数量
 */
const getCollect = (userId, page, count=10) => new Promise((resolve, reject) => {
    axios.get(config.serverUrl + '/index/my/getCollect', {
        userId,
        page,
        count
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 我的关注
 * userId     {string} [require]        userid
 * page     {number} [require]          第几页
 * count     {number}                   每页数量
 */
const getAttention = (userId, page, count=10) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/my/getAttention', {
        userId,
        page,
        count
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 获取个人信息
 * userId     {string} [require]        userid  // 我的id
 * id     {string} [require]        id          // 查看的id
 */
const getUserMessage = (userId, id) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/getUserMessage', {
        userId,
        id
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 关注他人
 * userId     {string} [require]        评论人id
 * id         {number} [require]        文章id
 */
const attention = (userId, id) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/index/attention', {
        userId,
        id
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 关注他人
 * id         {number} [require]        文章id
 */
const letHot = (id) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/letHot', {
        id
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 更改user
 * id         {number} [require]        我的id
 * name         {string} [require]      更新的名称
 * value         {string} [require]        更新的值
 */
const updateUser = (id, name, value) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/user/updateUser', {
        id,
        name,
        value
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 更改我的隐私状态
 * id         {number} [require]        我的id
 * value         {number} [require]        更新的值（0或者1）
 */
const updateSecret = (id, value) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/user/updateSecret', {
        id,
        value
    }).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })
})

/**
 * 举报/反馈
 * userId         {number} [require]        举报人id
 * articleId         {number} [require]        文章id
 * check         {string} [require]        举报的选项
 * message         {string}        举报的描述信息
 * phone         {string}        举报人的邮箱或者微信号
 */
const report = (userId, articleId, check, message, phone) => new Promise((resolve, reject) => {
    axios.post(config.serverUrl + '/index/detail/report', {
        userId,
        articleId,
        check,
        message,
        phone
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
    collect,
    publishComment,
    publishReply,
    delateReply,
    likeComment,
    register,
    login,
    isregister,
    getPublish,
    getCollect,
    getAttention,
    getUserMessage,
    attention,
    letHot,
    updateUser,
    updateSecret,
    report
}