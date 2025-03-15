/*
 * 路由
 */
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory } from 'vue-router';
import { routerArray } from './routes';
import { setRouteEmitter } from '@/utils/router-listener.ts';

/** 顶部进度条配置 */
nProgress.configure({
    easing: 'ease',
    speed: 600,
    showSpinner: false,
    trickleSpeed: 200,
    parent: 'body'
})

export const router = createRouter({
    history: createWebHistory(),
    routes: routerArray,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

// ----------------------- 路由加载前 -----------------------
router.beforeEach(async (to, _, next) => {
    // 进度条开启
    nProgress.start()

    setRouteEmitter(to)

    // 检查路由是否存在，若不存在则跳转至404页面
    if (to.matched.length === 0) {
        return next('/exception/404')
    }

    next()
})

// ----------------------- 路由加载后 -----------------------
router.afterEach((to) => {
    useMetaTitle(to)
    nProgress.done()
})