<template>
    <a-tooltip>
        <template #title>
            <template v-if="theme === 'light' || theme === 'dark'">
                {{ t?.(`app.config.theme.${theme}`) }}
            </template>
            <template v-else>
                {{ t?.(`app.config.layout.${theme}`) }}
            </template>
        </template>
        <div :class="cls">
            <my-icon name="CheckOutlined" v-show="checked" :style="{ color: colorPrimary }" :class="`${prefixCls}-selectIcon`" />
        </div>
    </a-tooltip>
</template>

<script setup lang="ts">
    const props = defineProps<{
        theme?: 'light' | 'dark' | 'top' | 'side' | 'mix'
        isDark?: boolean
        checked?: boolean
        t?: (key: string, ...args: any[]) => string
    }>()

    const token = useAntdToken()

    const colorPrimary = computed(() => token.token.value.colorPrimary)

    const prefixCls = shallowRef('setting-block-checkbox')

    const cls = computed(() => {
        return {
            [`${prefixCls.value}-item`]: true,
            [`${prefixCls.value}-theme-item`]: props.isDark,
            [`${prefixCls.value}-item-${props.theme}`]: !!props.theme,
            [`${prefixCls.value}-theme-item-${props.theme}`]: props.isDark
        }
    })
</script>

<style scoped lang="less">
@import "index.less";
</style>