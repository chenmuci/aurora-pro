<template>
    <!--左侧菜单 模式-->
    <SideLayout v-if="layout === 'side'" />
    <!--顶部菜单 模式-->
    <TopLayout v-if="layout === 'top'" />
    <!--混合模式-->
    <MixLayout v-if="layout === 'mix'" />
</template>

<script setup lang="ts">
    import SideLayout from "@/layout/side-layout.vue";
    import TopLayout from "@/layout/top-layout.vue";
    import MixLayout from "@/layout/mix-layout.vue";

    const { appConfig } = useAppStore()

    const layout = computed(() => appConfig.layout)
</script>