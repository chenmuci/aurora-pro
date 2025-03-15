<template>
    <a-layout-content class="layout-content-wrap" >
        <RouterView>
            <template #default="{ Component, route }">
                <Transition appear :name="appConfig.animation" mode="out-in">
                    <KeepAlive :include="[...cacheList]">
                        <Iframe v-if="route.meta.iframe && !route.meta.keepAlive" />
                        <component :is="Component" v-else :key="route.fullPath" />
                    </KeepAlive>
                </Transition>
            </template>
        </RouterView>
    </a-layout-content>
</template>

<script setup lang="ts">
    import Iframe from "./iframe.vue";

    const { appConfig } = useAppStore()
    const { cacheList } = useMultiTab()
</script>

<style lang="less" scoped>
.layout-content-wrap {
    background-color: inherit;
    min-height: auto;
    position: relative;
    overflow-x: hidden;
    padding: 10px 10px 10px 10px;
    height: calc(100% - 120px);
}
</style>