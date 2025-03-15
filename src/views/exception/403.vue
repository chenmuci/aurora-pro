<!--
  * 403 无权限 页面
-->
<template>
    <Exception :data="data" />
</template>

<script setup lang="ts">
    import imgUrl from '@/assets/images/403.png'

    const data = reactive({
        title: '403',
        desc: '抱歉，你无权访问该页面',
        btnText: '返回首页',
        imgUrl
    })
</script>