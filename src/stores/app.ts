/**
 * 项目的配置信息
 */
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { theme as antdTheme } from 'ant-design-vue/es'
import { appDefaultConfig } from "@/config/app-config.ts";
import type { AppConfig, ThemeType, LayoutType } from "@/types/config";

export const useAppStore = defineStore('app', () => {
    const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = antdTheme
    const appConfig = reactive(appDefaultConfig)
    const themeConfig = reactive<ThemeConfig>({
        algorithm: [antdTheme.defaultAlgorithm],
        token: {
            colorBgContainer: '#fff',
            colorPrimary: appConfig.colorPrimary
        },
        components: {}
    })

    const locale = ref<string>(lsLocaleState.value)
    const toggleLocale = (locale: string) => {
        lsLocaleState.value = locale
    }

    const toggleCompact = (isCompact = true) => {
        // 判断是否存在compactAlgorithm
        if (Array.isArray(themeConfig.algorithm)) {
            const index = themeConfig.algorithm.findIndex(item => item === compactAlgorithm)
            if (index >= 0 && isCompact) {
                return
            }
        }
        appConfig.compact = isCompact
        const algorithm = isDark.value ? [darkAlgorithm] : [defaultAlgorithm]
        isCompact && algorithm.push(compactAlgorithm)
        themeConfig.algorithm = algorithm
    }

    const toggleTheme = (theme: ThemeType) => {
        toggleCompact(appConfig.compact)
        if (appConfig.theme === theme)
            return
        appConfig.theme = theme
        if (theme === 'light') {
            if (themeConfig.token)
                themeConfig.token.colorBgContainer = '#fff'
            if (themeConfig.components?.Menu)
                delete themeConfig.components.Menu
            toggleDark(false)
        }
        else if (theme === 'dark') {
            toggleDark(true)
            if (themeConfig.token)
                themeConfig.token.colorBgContainer = 'rgb(36, 37, 37)'
            if (themeConfig.components) {
                themeConfig.components = {
                    ...themeConfig.components,
                    Menu: {
                        colorItemBg: 'rgb(36, 37, 37)',
                        colorSubItemBg: 'rgb(36, 37, 37)',
                        menuSubMenuBg: 'rgb(36, 37, 37)'
                    } as any
                }
            }
        }
    }

    const toggleColorPrimary = (color: string) => {
        appConfig.colorPrimary = color
        if (themeConfig.token)
            themeConfig.token.colorPrimary = color
    }

    const toggleLayout = (layout: LayoutType) => {
        if ( layout === 'mix')
            appConfig.theme = 'light'

        appConfig.layout = layout
    }

    const toggleGray = (isGray = true) => {
        appConfig.colorGray = isGray
        const dom = document.querySelector('body')
        if (dom) {
            if (isGray) {
                toggleWeak(false)
                dom.style.filter = 'grayscale(100%)'
            }
            else { dom.style.filter = '' }
        }
    }

    const toggleWeak = (isWeak = true) => {
        appConfig.colorWeak = isWeak
        const dom = document.querySelector('body')
        if (dom) {
            if (isWeak) {
                toggleGray(false)
                dom.style.filter = 'invert(80%)'
            }
            else { dom.style.filter = '' }
        }
    }

    if (appConfig.colorWeak)
        toggleWeak(true)

    const changeAppConfig = (key: keyof AppConfig, value: any) => {
        if (key === 'theme')
            toggleTheme(value as ThemeType)
        else if (key === 'colorPrimary')
            toggleColorPrimary(value)
        else if (key === 'layout')
            toggleLayout(value as LayoutType)
        else if (key === 'compact')
            toggleCompact(value)
        else if (key === 'colorWeak')
            toggleWeak(value)
        else if (key === 'colorGray')
            toggleGray(value)
        else if (key in appConfig)
            (appConfig as any)[key] = value
    }

    // 监听isDark的变化
    watch(isDark,
        () => {
            if (isDark.value)
                toggleTheme('dark')
            else
                toggleTheme('light')
        },
        {
            immediate: true
        }
    )

    // 监听语言变化
    watch(preferredLanguages,
        () => {
             toggleLocale(preferredLanguages.value[0])
        },
        {
            immediate: true
        }
    )

    return {
        appConfig,
        theme: themeConfig,
        locale,
        toggleLocale,
        changeAppConfig
    }
})