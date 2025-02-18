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
      proxy: {
        '/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      host: true
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
        dirs: ['src/stores', 'src/hooks'],
      }),
      Components({
        dts: 'src/types/components.d.ts',
        dirs: ['src/components']
      }),
      Unocss()
    ]
  })
}
