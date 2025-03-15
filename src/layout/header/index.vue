<template>
    <a-layout-header class="layout-header-wrap">
        <a-row class="layout-header-wrap-user" justify="space-between">
            <a-col class="layout-header-wrap-user-left">
                <my-icon :name="appConfig.collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" :size="20"
                         v-if="appConfig.layout === 'side'" @click="handleCollapsed" class="collapsed" />
                <a-breadcrumb separator=">" v-if="appConfig.breadCrumb" class="breadcrumb">
                    <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ t(`${ item }`)  }}</a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
            <a-col class="layout-header-wrap-user-right">
                <a-space :size="5">
                    <div class="space-item">
                        <my-icon name="icon-moon" :size="16" class="space-item-btn" />
                        <SelectLang />
                        <my-icon name="SettingOutlined" :size="16" class="space-item-btn" @click="settingShow" />
                    </div>
                    <div class="space-item-user">
                        <HeaderAvatar />
                    </div>
                </a-space>
            </a-col>
        </a-row>
        <MultiTab />
    </a-layout-header>
    <HeaderSetting
            ref="settingRef"
            :t="t"
            :theme="appConfig.theme"
            :color-primary="appConfig.colorPrimary"
            :layout="appConfig.layout"
            :accordion="appConfig.accordion"
            :bread-crumb="appConfig.breadCrumb"
            :multi-tab="appConfig.multiTab"
            :keep-alive="appConfig.keepAlive"
            :footer="appConfig.footer"
            :watermark="appConfig.watermark"
            :animation="appConfig.animation"
            :animation-list="animationList"
            :compact="appConfig.compact"
            :color-weak="appConfig.colorWeak"
            :color-gray="appConfig.colorGray"
            :app-config="appConfig"
            @setting-change="changeAppConfig"
    />
</template>

<script setup lang="ts">
    import { animationList } from "@/config/app-config.ts";

    const HeaderAvatar = defineAsyncComponent(() => import("@/layout/header/avatar.vue"))
    const MultiTab = defineAsyncComponent(() => import("@/layout/multi-tab/index.vue"))
    const HeaderSetting = defineAsyncComponent(() => import("@/layout/header/setting.vue"))

    const settingRef = ref()
    const currentRoute = useRoute()
    const { t } = useI18nLocale()
    const { appConfig, changeAppConfig } = useAppStore()
    const breadcrumb = ref<any>([])

    const settingShow = () => {
        settingRef.value.show()
    }

    const generatorBreadCrumb = () => {
        const matched = currentRoute.matched
        const currentBreadcrumb: any = []
        matched.forEach((record) => {
            if (record.meta && record.meta.title) {
                currentBreadcrumb.push(record.meta.locale)
            }
        })
        breadcrumb.value = currentBreadcrumb
    }

    const handleCollapsed = () => {
        appConfig.collapsed = !appConfig.collapsed
    }

    watch(
            () => currentRoute.matched,
            () => { generatorBreadCrumb() },
            {
                immediate: true
            }
    )
</script>

<style lang="less" scoped>
@import "index.less";
</style>