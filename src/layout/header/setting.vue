<template>
    <a-drawer v-model:open="visible" :width="300" :closable="false">
        <div mb-20px>
            <h3>{{ t?.('app.config.theme') }}</h3>
            <div class="setting-block-checkbox">
                <BlockCheckbox :t="t" :checked="props.theme === 'light'" theme="light"
                               :is-dark="props.theme === 'dark'" @click="changeTheme('light')" />
                <BlockCheckbox :t="t" :checked="props.theme === 'dark'" theme="dark"
                               :is-dark="props.theme === 'dark'" @click="changeTheme('dark')" />
            </div>
        </div>
        <div mb-20px>
            <h3>{{ t?.('app.config.color') }}</h3>
            <div class="setting-theme-color">
                <a-tooltip v-for="item in colorList" :key="item.color">
                    <template #title>
                        {{ t?.(`app.config.color.${item.key}`) }}
                    </template>
                    <div class="setting-theme-color-block" :style="{ backgroundColor: item.color }" @click="changeColor?.(item.color)">
                        <my-icon name="CheckOutlined" v-show="colorPrimary === item.color" />
                    </div>
                </a-tooltip>
            </div>
        </div>
        <div mb-20px>
            <h3>{{ t?.('app.config.layout') }}</h3>
            <div class="setting-block-checkbox">
                <BlockCheckbox :t="t" :checked="layout === 'side'" theme="side"
                               :is-dark="props.theme === 'dark'" @click="changeLayout('side')" />
                <BlockCheckbox :t="t" :checked="layout === 'top'" theme="top"
                               :is-dark="props.theme === 'dark'" @click="changeLayout('top')" />
                <BlockCheckbox :t="t" :checked="layout === 'mix'" theme="mix"
                               :is-dark="props.theme === 'dark'" @click="changeLayout('mix')" />
            </div>
        </div>
        <a-list :data-source="list" :split="false">
            <template #renderItem="{ item }">
                <a-tooltip :title="item.disabled ? item.disabledReason : ''" placement="left">
                    <a-list-item>
                        <span :style="{ opacity: item.disabled ? '0.5' : '1' }">
                            {{ t?.(`app.config.${item.key}`) }}
                        </span>
                        <template #actions>
                            <template v-if="item.key === 'accordion'">
                                <a-switch size="small" :checked="accordion" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('accordion', e)"/>
                            </template>
                            <template v-if="item.key === 'breadCrumb'">
                                <a-switch size="small" :checked="breadCrumb" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('breadCrumb', e)"/>
                            </template>
                            <template v-if="item.key === 'multiTab'">
                                <a-switch size="small" :checked="multiTab" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('multiTab', e)"/>
                            </template>
                            <template v-if="item.key === 'keepAlive'">
                                <a-switch size="small" :checked="keepAlive" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('keepAlive', e)"/>
                            </template>
                            <template v-if="item.key === 'footer'">
                                <a-switch size="small" :checked="footer" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('footer', e)"/>
                            </template>
                            <template v-if="item.key === 'watermark'">
                                <a-switch size="small" :checked="watermark" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('watermark', e)"/>
                            </template>
                            <template v-if="item.key === 'animation'">
                                <a-select size="small" :value="animation" :options="animationList" style="width: 120px;"
                                          @update:value="(e: any) => handleConfig('animation', e)"/>
                            </template>
                            <template v-if="item.key === 'compact'">
                                <a-switch size="small" :checked="compact" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('compact', e)"/>
                            </template>
                            <template v-if="item.key === 'colorWeak'">
                                <a-switch size="small" :checked="colorWeak" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('colorWeak', e)"/>
                            </template>
                            <template v-if="item.key === 'colorGray'">
                                <a-switch size="small" :checked="colorGray" :disabled="item.disabled"
                                          @update:checked="(e: any) => handleConfig('colorGray', e)"/>
                            </template>
                        </template>
                    </a-list-item>
                </a-tooltip>
            </template>
        </a-list>
        <a-divider />
        <div flex gap-2 flex-col>
            <a-alert type="warning" show-icon :message="t?.('app.config.hint')" />
            <a-button type="primary" @click="copyConfig">
                <my-icon name="CopyOutlined" /> {{ t?.('app.config.copy') }}
            </a-button>
        </div>
    </a-drawer>
</template>

<script setup lang="ts">
    import { useClipboard } from '@v-c/utils'
    import { message } from "ant-design-vue"
    import type { ThemeType, LayoutType, AnimationType } from "@/types/config";
    import BlockCheckbox from './block-checkbox.vue'

    const emit = defineEmits(['settingChange'])
    const { copy } = useClipboard()
    const props = withDefaults(
        defineProps<{
            theme?: ThemeType
            colorPrimary?: string
            colorList?: { key: string, color: string }[]
            layout?: LayoutType
            accordion?: boolean
            breadCrumb?: boolean
            multiTab?: boolean
            keepAlive?: boolean
            footer?: boolean
            watermark?: boolean
            animation?: AnimationType
            animationList?: any[]
            compact?: boolean
            colorWeak?: boolean
            colorGray?: boolean
            appConfig?: Record<string, any>
            t?: (key: string, ...args: any[]) => string
        }>(),
        {
            theme: 'light',
            colorList: () => [
                { key: 'tech', color: '#1677FF' },
                { key: 'daybreak', color: '#1890FF' },
                { key: 'dust', color: '#F5222D' },
                { key: 'volcano', color: '#FA541C' },
                { key: 'sunset', color: '#FAAD14' },
                { key: 'cyan', color: '#13C2C2' },
                { key: 'green', color: '#52C41A' },
                { key: 'geek', color: '#2F54EB' },
                { key: 'purple', color: '#722ED1' },
            ]
        }
    )
    const list = computed(() => [
        {
            title: '菜单手风琴',
            key: 'accordion',
            disabled: false
        },
        {
            title: '面包屑',
            key: 'breadCrumb',
            disabled: false
        },
        {
            title: '标签页',
            key: 'multiTab',
            disabled: false
        },
        {
            title: '缓存',
            key: 'keepAlive',
            disabled: false
        },
        {
            title: '页脚',
            key: 'footer',
            disabled: false
        },
        {
            title: '水印',
            key: 'watermark',
            disabled: false
        },
        {
            title: '动画效果',
            key: 'animation',
            disabled: false
        },
        {
            title: '紧凑模式',
            key: 'compact',
            disabled: false
        },
        {
            title: '色弱模式',
            key: 'colorWeak',
            disabled: false
        },
        {
            title: '灰色模式',
            key: 'colorGray',
            disabled: false
        }
    ])

    const visible = ref(false)

    const show = () => {
        visible.value = true
    }

    const changeTheme = (theme: ThemeType) => {
        emit('settingChange', 'theme', theme)
    }

    const changeColor = (color: string) => {
        emit('settingChange', 'colorPrimary', color)
    }

    const changeLayout= (layout: string) => {
        emit('settingChange', 'layout', layout)
    }

    const handleConfig = (key: string, value: any) => {
        emit('settingChange', key, value)
    }

    const copyConfig = () => {
        copy(JSON.stringify(props.appConfig ?? {}))
        message.success(props?.t?.('app.config.hint'))
    }

    defineExpose({
        show
    })
</script>

<style scoped lang="less">
@import "index.less";
</style>