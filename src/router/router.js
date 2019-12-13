import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config/index'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: config.routeUrl,
    routes: [
        {
            path: '/',
            name: 'initial',
            component: ()=> import('@/views/Initial'),
            meta: {
                title: '序',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '',
            component: ()=> import('@/views/Home'),
            meta: {
                keepAlive: true // 需要被缓存
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
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
                title: '登录',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/register',
            name: 'register',
            component: ()=> import('@/views/login/Register'),
            meta: {
                title: '注册',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/information',
            name: 'information',
            component: ()=> import('@/views/login/Information'),
            meta: {
                title: '我的',
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/information/picture',
            name: 'inforPicture',
            component: ()=> import('@/views/login/Picture'),
            meta: {
                title: '我的图像',
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/information/message',
            name: 'inforMessage',
            component: ()=> import('@/views/login/Message'),
            meta: {
                title: '我的信息',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: ()=> import('@/views/settings/Settings'),
            meta: {
                title: '设置',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: ()=> import('@/views/detail/Detail'),
            meta: {
                title: '详情',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/people',
            name: 'people',
            component: ()=> import('@/views/detail/People'),
            meta: {
                title: '个人主页',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/collect',
            name: 'collect',
            component: ()=> import('@/views/my/Collect'),
            meta: {
                title: '我的收藏',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '/publish',
            name: 'publish',
            component: ()=> import('@/views/my/Publish'),
            meta: {
                title: '我的文章',
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/attention',
            name: 'attention',
            component: ()=> import('@/views/my/Attention'),
            meta: {
                title: '我的关注',
                keepAlive: false // 需要被缓存
            }
        },
        {
            path: '*',
            name: 'error',
            component: ()=> import('@/views/404'),
            meta: {
                title: '404',
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
