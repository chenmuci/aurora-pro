import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default (mode: string) => {
  const root:string = process.cwd()
  const env:Record<string, string> = loadEnv(mode, root)
  const { VITE_API_URL } = env

  return defineConfig({
    server: {
      port: 5000,
      host: "0.0.0.0",
      proxy: {
        '/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia'
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/stores', 'src/composables'],
      }),
      Components({
        dts: 'src/types/components.d.ts',
        dirs: ['src/components'],
        deep: true
      }),
      Unocss()
    ],
    build: {
      // 清除console和debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      target: 'modules',
      outDir: 'dist/', // 指定输出路径
      assetsDir: 'assets', // 指定生成静态文件目录
      assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
      chunkSizeWarningLimit: 500, // chunk 大小警告的限制
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      emptyOutDir: true, //打包前先清空原有打包文件
    }
  })
}
