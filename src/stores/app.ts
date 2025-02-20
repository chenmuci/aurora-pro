/**
 * 项目的配置信息
 */
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { theme as antdTheme } from 'ant-design-vue/es'
import { appDefaultConfig } from "@/config/app-config.ts";

export const useAppStore = defineStore('app', () => {
    // const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = antdTheme
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

    // 监听语言变化
    watch(preferredLanguages, () => {
        toggleLocale(preferredLanguages.value[0])
    })

    return {
        appConfig,
        theme: themeConfig,
        locale,
        toggleLocale
    }
})