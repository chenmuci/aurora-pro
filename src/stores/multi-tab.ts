import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { message } from "ant-design-vue";
import { router } from '@/router';

const allowList = ['login', '404', '403', '500']

export interface MultiTabItem {
    path?: string
    fullPath?: string
    name?: string
    title?: string
    icon?: string
    locale?: string
    affix?: boolean
    loading?: boolean
}

export const useMultiTab = defineStore('multi-tab', () => {

    const appStore = useAppStore()
    const list = ref<MultiTabItem[]>([])
    const refreshItem = ref<MultiTabItem | null>(null)
    const cacheList = ref<string[]>([])
    const activeKey = shallowRef()

    const addItem = (route: RouteLocationNormalizedLoaded) => {
        if (!route)
            return
        // 判断是不是重定向的地址，如果是，那么就不进行处理
        if (route.path.startsWith('/redirect'))
            return
        if (route.path === '/')
            return
        if (allowList.includes(<string>route.name))
            return
        // 设置当前的loading为false
        if (refreshItem.value) {
            // 增加一个取消的延迟
            setTimeout(() => {
                if (refreshItem.value) {
                    refreshItem.value.loading = false
                    refreshItem.value = null
                }
            }, 500)
        }
        if (list.value.some(item => item.fullPath === route.fullPath)) {
            if (!cacheList.value.includes(route?.name as string) && appStore.appConfig.keepAlive) {
                if (route.meta.keepAlive && route.name)
                    cacheList.value.push(route.name as string)
            }
            return
        }
        const item: MultiTabItem = {
            path: route.path as string,
            fullPath: route.fullPath as string,
            title: route.meta.title as string,
            name: route.name as string,
            icon: route.meta.icon as string,
            affix: route.meta.affix as boolean,
            locale: route.meta.locale as string
        }
        if (!cacheList.value.includes(item?.name as string) && appStore.appConfig.keepAlive) {
            if (route.meta.keepAlive && route.name)
                cacheList.value.push(route.name as string)
        }

        list.value.push(item)
    }

    const close = (key: any) => {
        // 判断长度是不是小于等于1，如果是那么这个就不能被关闭
        if (list.value.length <= 1) {
            message.error('不能关闭最后一个标签页').then()
            return
        }
        const index = list.value.findIndex(item => item.fullPath === key)
        if (index < 0) {
            message.error('当前页签不存在无法关闭').then()
            return
        }
        const item = list.value[index]
        // 需要判断当前的标签是不是被选中，如果是，还需要判断当前是不是第一个页签，如果是，那么就需要激活上一个页签，如果不是，那就需要激活下一个页签
        if (item.fullPath === activeKey.value) {
            const newItem: any = index === 0 ? list.value[index + 1] : list.value[index - 1]
            activeKey.value = newItem.fullPath
            router.push(newItem.fullPath).then()
        }
        // 去除缓存
        if (appStore.appConfig.keepAlive && item.name)
            cacheList.value = cacheList.value.filter(name => name !== item.name)

        list.value = list.value.filter(item => item.fullPath !== key)
    }

    const refresh = (key: string) => {
        const item: any = list.value.find(item => item.fullPath === key)
        if (item) {
            cacheList.value = cacheList.value.filter(name => name !== item.name)
            item.loading = true
            refreshItem.value = item
            router.replace(`/redirect/${encodeURIComponent(item.fullPath)}`).then()
        }
    }

    const switchTab = (key: any) => {
        if (key === activeKey.value)
            return
        router.push(key).then()
    }

    const closeOther = (key: string) => {
        switchTab(key)
        list.value.forEach((item: any) => {
            if (item.affix)
                return
            if (item.fullPath === key)
                return
            close(item.fullPath)
        })
    }

    const closeLeft = (key: string) => {
        switchTab(key)
        const index = list.value.findIndex(item => item.fullPath === key)
        const leftList = list.value.slice(0, index)
        leftList.forEach((item: any) => {
            if (item.affix)
                return
            close(item.fullPath)
        })
    }

    const closeRight = (key: string) => {
        switchTab(key)
        const index = list.value.findIndex(item => item.fullPath === key)
        const rightList = list.value.slice(index + 1)
        rightList.forEach((item: any) => {
            if (item.affix)
                return
            close(item.fullPath)
        })
    }

    const clear = () => {
        list.value = []
        cacheList.value = []
        activeKey.value = undefined
        refreshItem.value = null
    }

    return {
        list,
        cacheList,
        activeKey,
        addItem,
        close,
        refresh,
        switchTab,
        closeOther,
        closeLeft,
        closeRight,
        clear
    }
})