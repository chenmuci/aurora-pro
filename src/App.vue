<!--
  * 主应用页面
-->
<template>
    <a-config-provider :theme="theme" :locale="antd">
        <a-spin :spinning="spinning" tip="稍等片刻，拼命加载中...">
            <TokenProvider>
                <RouterView />
            </TokenProvider>
        </a-spin>
    </a-config-provider>
</template>

<script setup lang="ts">
    const { theme } = useAppStore()
    const { antd } = useI18nLocale()
    // 全局loading
    const spinStore = useSpinStore()
    const spinning = computed(() => spinStore.loading)
</script>

<style scoped>

</style>
