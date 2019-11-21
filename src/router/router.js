import Vue from 'vue'
import Router from 'vue-router'

import Initial from '../views/Initial'
import Home from '../views/Home'
import HomePage from '../views/home/Home'
import AddPage from '../views/home/Add'
import MyPage from '../views/home/My'
import Login from '../views/login/Login'
import Register from '../views/login/Register'
import Information from '../views/login/Information'
import Picture from '../views/login/Picture'
import Message from '../views/login/Message'
import Settings from '../views/settings/Settings'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'initial',
            component: Initial,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/home',
                    component: HomePage,
                    meta: {
                        title: '首页',
                        keepAlive: true // 需要被缓存
                    }
                },{
                    path: '/add',
                    component: AddPage,
                    meta: {
                        title: '添加',
                        keepAlive: true // 需要被缓存
                    }
                },{
                    path: '/my',
                    component: MyPage,
                    meta: {
                        title: '我的',
                        keepAlive: true // 需要被缓存
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/information',
            name: 'information',
            component: Information,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/information/picture',
            name: 'inforPicture',
            component: Picture,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/information/message',
            name: 'inforMessage',
            component: Message,
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
    ]
})
