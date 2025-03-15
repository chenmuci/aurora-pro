<template>
    <!-- 标签页，共两部分：1、标签 ；2、标签操作区 -->
    <a-row style="border-bottom: 1px solid #eeeeee; position: relative" v-show="multiTab">
        <!--标签页-->
        <div class="multi-tab-wrap">
            <a-tabs style="width: 100%" tab-position="top" v-model:activeKey="activeKey" size="small" animated
                    @tabClick="multiTabStore.switchTab">
                <a-tab-pane v-for="item in list" :key="item.path">
                    <template #tab>
                        <a-dropdown :trigger="['contextmenu']">
                            <span>
                                <my-icon :name="item.icon" style="margin-right: 5px" />
                                {{ t?.(`${item.locale}`) }}
                                <my-icon name="CloseOutlined" @click.stop="multiTabStore.close(item.fullPath)"
                                         v-if="!item.affix && list.length > 1" class="multi-tab-wrap-close" />
                            </span>
                            <template #overlay>
                                <a-menu @click="handleSwitch($event, item.fullPath)">
                                    <a-menu-item key="closeCurrent" :disabled="isCurrentDisabled || activeKey !== item.fullPath">
                                        {{ t("app.multiTab.closeCurrent") }}
                                    </a-menu-item>
                                    <a-menu-item key="closeLeft" :disabled="isCurrentDisabled || leftDisabled(item.fullPath)">
                                        {{ t("app.multiTab.closeLeft") }}
                                    </a-menu-item>
                                    <a-menu-item key="closeRight" :disabled="isCurrentDisabled || rightDisabled(item.fullPath)">
                                        {{ t("app.multiTab.closeRight") }}
                                    </a-menu-item>
                                    <a-menu-item key="closeOther" :disabled="isCurrentDisabled || otherDisabled">
                                        {{ t("app.multiTab.closeOther") }}
                                    </a-menu-item>
                                    <a-menu-item key="refresh" :disabled="!isCurrentDisabled">
                                        {{ t("app.multiTab.refresh") }}
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>
                </a-tab-pane>
            </a-tabs>
        </div>
        <!--标签页操作区-->
        <a-dropdown>
            <div class="multi-tab-operate">
                <div class="multi-tab-operate-icon">
                    <my-icon name="AppstoreOutlined" :size="16" />
                </div>
            </div>
            <template #overlay>
                <a-menu @click="handleSwitch($event, activeKey)">
                    <a-menu-item key="refresh">{{ t("app.multiTab.refresh") }}</a-menu-item>
                    <a-menu-item key="closeOther" :disabled="isCurrentDisabled || otherDisabled">
                        {{ t("app.multiTab.closeOther") }}
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </a-row>
</template>

<script setup lang="ts">
    import type { RouteLocationNormalized } from "vue-router";
    import { listenerRouteChange, removeRouteListener } from "@/utils/router-listener.ts";

    const { t } = useI18nLocale()
    const { appConfig } = useAppStore()
    const multiTabStore = useMultiTab()
    const { list, activeKey } = storeToRefs(multiTabStore)

    const multiTab = computed(() => appConfig.multiTab)

    const handleSwitch = ({ key }: any, current: any) => {
        if (key === 'closeCurrent')
            multiTabStore.close(activeKey.value)
        else if (key === 'closeLeft')
            multiTabStore.closeLeft(current)
        else if (key === 'closeRight')
            multiTabStore.closeRight(current)
        else if (key === 'closeOther')
            multiTabStore.closeOther(current)
        else if (key === 'refresh')
            multiTabStore.refresh(activeKey.value)
    }

    const isCurrentDisabled = computed(() => {
        return (list.value.length === 1 || list.value.filter(v => !v.affix).length <= 1)
    })

    const leftDisabled = (key: any) => {
        // 判断左侧是否还有可关闭的
        const index = list.value.findIndex(v => v.fullPath === key)
        return index === 0 || list.value.filter(v => !v.affix).length <= 1
    }

    const rightDisabled = (key: any) => {
        // 判断右侧是否还有可关闭的
        const index = list.value.findIndex(v => v.fullPath === key)
        return (
                index === list.value.length - 1
                || list.value.filter(v => !v.affix).length <= 1
        )
    }

    const otherDisabled = computed(() => {
        return (
                list.value.length === 1 || list.value.filter(v => !v.affix).length <= 1
        )
    })

    listenerRouteChange((route: RouteLocationNormalized) => {
        if (route.fullPath.startsWith('/redirect'))
            return
        const item = list.value.find(item => item.fullPath === route.fullPath)

        if (route.fullPath === activeKey.value && !item?.loading)
            return
        activeKey.value = route.fullPath
        multiTabStore.addItem(route)
    }, true)

    onUnmounted(() => {
        removeRouteListener()
    })
</script>

<style scoped lang="less">
@import "index.less";
</style>