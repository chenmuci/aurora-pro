/*
 * 路由
 */
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory } from 'vue-router';
import { routerArray } from './routes';

export const router = createRouter({
    history: createWebHistory(),
    routes: routerArray,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

// ----------------------- 路由加载前 -----------------------
router.beforeEach(async (to, from, next) => {
    // 进度条开启
    nProgress.start()

    next()
})

// ----------------------- 路由加载后 -----------------------
router.afterEach(() => {
    nProgress.done()
})