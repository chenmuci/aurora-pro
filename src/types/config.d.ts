/**
 * 三种布局: 左侧、顶部、混合
 */
export type LayoutType = 'side' | 'top' | 'mix'

/**
 * 主题： 亮色，暗色
 */
export type ThemeType = 'light' | 'dark'

/**
 * 动画效果：fade、slide-right、slide-top、slide-bottom
 */
export type AnimationType = 'none' | 'fade' | 'slide-right' | 'slide-top' | 'slide-bottom'

/**
 * 应用信息配置
 */
export interface AppConfig {
    // 布局
    layout: LayoutType
    // 主题
    theme: ThemeType
    // 主题颜色
    colorPrimary: string
    // 菜单隐藏/显示
    collapsed: boolean
    // 菜单手风琴
    accordion: boolean
    // 面包屑
    breadCrumb: boolean
    // 标签页
    multiTab: boolean
    // 缓存
    keepAlive: boolean
    // 页脚
    footer: boolean
    // 水印
    watermark: boolean
    // 页面切换动画
    animation: AnimationType
    // 紧凑
    compact: boolean
    // 色弱模式
    colorWeak: boolean
    // 灰色模式
    colorGray: boolean
}