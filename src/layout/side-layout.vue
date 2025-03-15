<template>
    <a-layout class="side-layout-wrap" style="min-height: 100%">
        <LayoutMenu />
        <a-layout class="side-layout-main-wrap" :style="`height: ${windowHeight}px`">
            <LayoutHeader />
            <LayoutContent />
            <LayoutFooter />
            <a-back-top :target="backTopTarget" :visibilityHeight="80" />
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
    const LayoutMenu = defineAsyncComponent(() => import("@/layout/menu/index.vue"))
    const LayoutHeader = defineAsyncComponent(() => import("@/layout/header/index.vue"))
    const LayoutContent = defineAsyncComponent(() => import("@/layout/component/route-view.vue"))
    const LayoutFooter = defineAsyncComponent(() => import("@/layout/footer/index.vue"))

    const windowHeight = ref(window.innerHeight)

    const backTopTarget = () => {
        return document.getElementById('.side-layout-main-wrap')
    }
</script>