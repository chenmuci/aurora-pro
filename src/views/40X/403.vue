<!--
  * 403 无权限 页面
-->
<template>
    <a-result status="403" title="对不起，您没有权限访问此内容">
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