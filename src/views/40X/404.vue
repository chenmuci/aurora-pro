<!--
  * 404 不存在 页面
-->
<template>
    <a-result status="404" title="对不起，您访问的内容不存在！">
        <template #extra>
            <a-button type="primary" @click="goHome">返回首页</a-button>
        </template>
    </a-result>
</template>
<script setup lang="ts">
    const router = useRouter();
    const goHome = () => {
        router.push({ name: 'home' })
    }
</script>