<template>
    <a-layout-sider :collapsed="appConfig.collapsed" :theme="appConfig.theme" class="side-menu-wrap">
        <div class="side-menu-wrap-logo" @click="onGoHome" :style="`width: ${logoWidth}px`">
            <img :src="Logo" alt="logo" class="h-10 w-10">
        </div>
        <div class="side-menu-wrap-menu">
            <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" @select="turnToPage"
                    :mode="appConfig.layout === 'top' ? 'horizontal' : 'inline'" :theme="appConfig.theme"
                    :collapsed="appConfig.collapsed" @openChange="onOpenChange">
                <template v-for="item in menuData">
                    <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.path">
                        <template #icon>
                            <my-icon :name="item.meta.icon" />
                        </template>
                        <template #title>
                            <span>{{ t(`${item?.meta.locale}`) }}</span>
                        </template>
                        <SubMenu :routes="item.children" />
                    </a-sub-menu>
                    <template v-else>
                        <a-menu-item :key="item.path">
                            <template #icon>
                                <my-icon :name="item.meta.icon" />
                            </template>
                            <span>{{ t(`${item?.meta.locale}`) }}</span>
                        </a-menu-item>
                    </template>
                </template>
            </a-menu>
        </div>
    </a-layout-sider>
</template>

<script lang="ts" setup>
    import Logo from '@/assets/images/logo.png'
    import menuData from '@/api/menu.ts'

    const SubMenu = defineAsyncComponent(() => import('@/layout/menu/sub-menu.vue'))

    const { t } = useI18nLocale()
    const currentRoute = useRoute()
    const router = useRouter()
    const appStore = useAppStore()
    const { appConfig } = storeToRefs(appStore)
    const selectedKeys = ref<any>([])
    const openKeys = ref<any>([])

    const onGoHome = () => {
        router.push("/home")
    }

    const turnToPage = (item: any) => {
        router.push(item.key)
    }

    const onOpenChange = (event: any) => {
        if (appConfig.value.accordion)
            openKeys.value = [event[1]]
    }

    const updateOpenKeysAndSelectKeys = (fullPath: any) => {
        selectedKeys.value = [fullPath]
        const path = currentRoute.fullPath.split('/')
        if (path.length > 2) {
            openKeys.value.push(path.slice(0, 2).join('/'))
        } else {
            openKeys.value.push(path)
        }
    }

    const logoWidth = computed(() => appConfig.value.collapsed ? 80 : 200)

    watch(() => currentRoute.fullPath, (newPath) => {
            updateOpenKeysAndSelectKeys(newPath)
        }, { immediate: true }
    )
</script>

<style lang="less" scoped>
.side-menu-wrap {
    height: 100vh;
    overflow-y: auto;
    z-index: 10;
    &-logo {
        height: 60px;
        line-height: 60px;
        position: fixed;
        z-index: 21;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }
    &-menu {
        margin-top: 60px;
    }
}
</style>