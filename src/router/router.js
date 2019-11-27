import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'initial',
            component: ()=> import('@/views/Initial'),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '',
            name: 'home',
            component: ()=> import('@/views/Home'),
            meta: {
                keepAlive: true // 需要被缓存
            },
            children: [
                {
                    path: '/home',
                    component: ()=> import('@/views/home/Home'),
                    meta: {
                        title: '首页',
                        keepAlive: true // 需要被缓存
                    }
                },{
                    path: '/add',
                    component: ()=> import('@/views/home/Add'),
                    meta: {
                        title: '添加',
                        keepAlive: true // 需要被缓存
                    }
                },{
                    path: '/my',
                    component: ()=> import('@/views/home/My'),
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
            component: ()=> import('@/views/login/Login'),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('@/views/login/Register'),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/information',
            name: 'information',
            component: ()=> import('@/views/login/Information'),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/information/picture',
            name: 'inforPicture',
            component: ()=> import('@/views/login/Picture'),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/information/message',
            name: 'inforMessage',
            component: ()=> import('@/views/login/Message'),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: ()=> import('@/views/settings/Settings'),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: ()=> import('@/views/detail/Detail'),
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '*',
            name: 'error',
            component: ()=> import('@/views/home/Home'),
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        if(savedPosition){
            return savedPosition;
        }else{
            return {x:0,y:0}
        }
    }
})
