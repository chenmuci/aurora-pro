<template>
    <icon-font v-if="isIcon" :type="getIconName" :style="setIconStyle" />
    <div v-else-if="isImg" :style="setImgOutStyle">
        <img :src="getIconName" :style="setImgStyle" alt="" />
    </div>
    <component v-else :is="getIconName" :style="setIconStyle" />
</template>

<script setup lang="ts">
    import { createFromIconfontCN } from "@ant-design/icons-vue";

    const props = defineProps({
        name: {
            type: String
        },
        size: {
            type: Number,
            default: () => 14
        },
        color: {
            type: String
        }
    })

    // 获取外部ali图库
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/c/font_4698761_pi8tbowdws.js'
    })

    // 在线链接、本地引入地址前缀
    const linesString = ['https', 'http', '/src', '/assets', 'data:images']

    // 获取 icon 图标名称
    const getIconName = computed(() => {
        return <string>props?.name
    })

    // 用于判断 Iconfont 图标
    const isIcon = computed(() => {
        return props?.name?.startsWith('icon-')
    })

    // 用于判断在线链接、本地引入等图标显示、隐藏
    const isImg = computed(() => {
        return linesString.find((str) => props.name?.startsWith(str))
    })

    // 设置图标样式
    const setIconStyle = computed(() => {
        return `font-size: ${props.size}px;color: ${props.color};cursor: pointer;`
    })

    // 设置图片样式
    const setImgOutStyle = computed(() => {
        return `width: ${props.size}px;height: ${props.size}px;display: inline-block;overflow: hidden;`
    })

    // 设置图片样式
    const setImgStyle = computed(() => {
        const filterStyle: string[] = []
        const compatibles: string[] = ['-webkit', '-ms', '-o', '-moz']
        compatibles.forEach((j) => filterStyle.push(`${j}-filter: drop-shadow(${props.color} 30px 0);`));
        return `width: ${props.size}px;height: ${props.size}px;position: relative;left: -${props.size}px;${filterStyle.join('')}`
    })
</script>