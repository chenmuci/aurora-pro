/*
 * 应用默认配置
 */
import type { AppConfig } from "@/types/config";

export const appDefaultConfig: AppConfig = {
    // 布局
    layout: 'side',
    // 主题
    theme: 'light',
    // 主题颜色
    colorPrimary: '#1677FF',
    // 菜单显示/隐藏
    collapsed: false,
    // 菜单手风琴
    accordion: true,
    // 面包屑
    breadCrumb: true,
    // 标签页
    multiTab: true,
    // 缓存
    keepAlive: true,
    // 页脚
    footer: true,
    // 水印
    watermark: false,
    // 页面切换动画
    animation: 'slide-right',
    // 紧凑
    compact: false,
    // 色弱模式
    colorWeak: false,
    // 灰色模式
    colorGray: false
}

export const animationList = [
    {
        label: 'None',
        value: 'none'
    },
    {
        label: 'Fade',
        value: 'fadein-up'
    },
    {
        label: 'Slide Right',
        value: 'slide-right'
    },
    {
        label: 'Slide Top',
        value: 'slide-top'
    },
    {
        label: 'Slide Bottom',
        value: 'slide-bottom'
    }
]