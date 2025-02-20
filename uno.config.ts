import {
    defineConfig,
    presetUno,
    presetAttributify,
    presetTypography,
    presetIcons,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetTypography(),
        presetIcons({
            scale: 1.2,
            warn: true,
        })
    ],
    shortcuts: [
        ['flex-center', 'flex items-center justify-center'],
        ['flex-between', 'flex items-center justify-between'],
        ['flex-end', 'flex items-end justify-between']
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
})