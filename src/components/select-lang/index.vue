<template>
    <a-dropdown :trigger="['click']">
        <span class="item-wrap transition-all-300">
            <my-icon name="icon-language" :size="16" />
        </span>
        <template #overlay>
            <a-menu :selected-keys="[locale]" @click="handleClick">
                <a-menu-item key="zh-CN">
                    <template #icon>
                        <span>
                          🇨🇳
                        </span>
                    </template>
                    简体中文
                </a-menu-item>
                <a-menu-item key="en-US">
                    <template #icon>
                        <span>
                          🇺🇸
                        </span>
                    </template>
                    English
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
    const { locale, setLocale } = useI18nLocale()

    function handleClick({ key }: any) {
        setLocale(key)
    }
</script>

<style lang="less" scoped>
.item-wrap {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 12px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
}
.item-wrap:hover {
    background-color: var(--hover-color);
}
</style>