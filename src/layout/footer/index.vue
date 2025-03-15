<template>
    <a-layout-footer class="layout-footer-wrap" v-show="footer">
        <div class="version">
            <a target="_blank" class="copyright" href="https://www.baidu.com"> ©2012-{{ currentYear }} AuroraAdmin </a>
        </div>
    </a-layout-footer>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';

    const { appConfig } = useAppStore()

    const currentYear = dayjs().year()
    const footer = computed(() => appConfig.footer)
</script>

<style scoped lang="less">
.layout-footer-wrap {
    position: relative;
    padding: 0 0 10px 0;
    display: flex;
    justify-content: center;
}

.version {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    a {
        color: rgba(0, 0, 0, 0.45);
    }
    a:hover {
        color: #1477ff;
    }
}
</style>