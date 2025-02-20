/*
 * 所有路由入口
 */
import NotFound from '@/views/40X/404.vue';
import NoPrivilege from '@/views/40X/403.vue';
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
                    locale: 'setting.title',
                    icon: 'HomeOutlined',
                    parentMenuList: [{ name: '_home', title: '首页' }]
                },
                component: () => import('@/views/home/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: 'setting.title'
        }
    },
    { path: '/:pathMatch(.*)*', name: '404', component: NotFound },
    { path: '/403', name: '403', component: NoPrivilege }
]