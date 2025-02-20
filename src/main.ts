import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import * as antIcon from '@ant-design/icons-vue';
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import { router } from '@/router';
import { pinia } from '@/stores';
import { setupI18n } from "@/locales";
import '@/theme/index.css';
import 'virtual:uno.css';

async function initApp() {
    let antIcons: any = antIcon
    let vueApp = createApp(App)
    let app = vueApp.use(router).use(pinia).use(Antd)

    await setupI18n(app)
    // 注册图标组件
    Object.keys(antIcons).forEach((key: string) => {
        app.component(key, antIcons[key])
    })

    app.mount('#app')
}

initApp().then()