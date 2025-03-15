<template>
    <template v-for="item in props.routes">
        <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.path">
            <template #icon>
                <my-icon :name="item.meta.icon" />
            </template>
            <template #title>
                <span>{{ t(`${item?.meta.locale}`) }}</span>
            </template>
            <sub-menu :item="item.children" />
        </a-sub-menu>
        <template v-else>
            <a-menu-item :key="item.path">
                <template #icon>
                    <my-icon :name="item.meta.icon" />
                </template>
                <span>{{ t(`${item?.meta.locale}`) }}</span>
            </a-menu-item>
        </template>
    </template>
</template>

<script setup lang="ts">
    const props = defineProps(["routes"])

    const { t } = useI18nLocale()
</script>