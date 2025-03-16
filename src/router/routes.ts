/*
 * 所有路由入口
 */
import NotFound from '@/views/exception/404.vue';
import NoPermission from '@/views/exception/403.vue';
import ServerError from '@/views/exception/500.vue';
import AuroraLayout from '@/layout/index.vue';

export const routerArray = [
    {
        path: '/',
        name: '_home',
        redirect: { name: 'home' },
        component: AuroraLayout,
        meta: {
            icon: 'HomeOutlined'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    locale: 'route.home',
                    icon: 'HomeOutlined',
                    affix: true
                },
                component: () => import('@/views/home/index.vue')
            },
            {
                path: '/docs',
                name: 'docs',
                meta: {
                    title: '文档中心',
                    locale: 'route.docs',
                    icon: 'ReadOutlined'
                },
                children: [
                    {
                        path: '/docs/help',
                        name: 'help',
                        meta: {
                            title: '帮助文档',
                            locale: 'route.docs.help',
                            icon: 'QuestionCircleOutlined',
                            affix: false,
                            iframe: true,
                            url: 'https://www.baidu.com'
                        }
                    }
                ]
            },
            {
                path: '/system',
                name: 'system',
                meta: {
                    title: '系统管理',
                    locale: 'route.system',
                    icon: 'SettingOutlined'
                },
                children: [
                    {
                        path: '/system/setting',
                        name: 'setting',
                        component: () => import('@/views/home/index.vue'),
                        meta: {
                            title: '系统设置',
                            locale: 'route.system.setting',
                            icon: 'SettingOutlined',
                            affix: false
                        }
                    }
                ]
            },
            {
                path: '/redirect/:path(.*)',
                name: 'RedirectPath',
                component: () => import('@/layout/component/redirect.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/exception',
        name: 'Exception',
        meta: { title: '异常页面' },
        children: [
            { path: '/:pathMatch(.*)*', name: '404', component: NotFound, meta: { title: '404' } },
            { path: '/exception/403', name: '403', component: NoPermission, meta: { title: '403' }  },
            { path: '/exception/500', name: '500', component: ServerError, meta: { title: '500' }  }
        ]
    }
]