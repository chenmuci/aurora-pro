<!--
  * 500 服务器出错
-->
<template>
    <Exception :data="data" />
</template>

<script setup lang="ts">
    import imgUrl from '@/assets/images/500.png'

    const data = reactive({
        title: '404',
        desc: '抱歉，服务器出错了',
        btnText: '返回首页',
        imgUrl
    })
</script>