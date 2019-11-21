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
  register,
  login,
  isregister
}