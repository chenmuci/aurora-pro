<template>
    <div class="login-container">
        <div class="top-right-wrap">
            <div class="btn">
                <my-icon name="icon-moon" :size="16" />
            </div>
            <select-lang />
        </div>
        <div class="login-wrap">
            <a-typography class="title"><h4>{{ t("page.login.title") }}</h4></a-typography>
            <a-form ref="formRef" :model="loginForm" :rules="rules">
                <a-form-item name="username">
                    <a-input v-model:value="loginForm.username" :placeholder="t('page.login.username.placeholder')" allow-clear>
                        <template #prefix>
                            <my-icon name="UserOutlined" mr5px />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="password">
                    <a-input-password v-model:value="loginForm.password" :placeholder="t('page.login.password.placeholder')" allow-clear>
                        <template #prefix>
                            <my-icon name="LockOutlined" mr5px />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item name="captcha" v-show="false">
                    <a-input v-model:value.trim="loginForm.captcha" :placeholder="t('page.login.captcha.placeholder')" allow-clear />
                    <img class="captcha-img" :src="captchaBase64Image" @click="getCaptcha" alt=""/>
                </a-form-item>
                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="rememberMe">{{ t("page.login.rememberMe") }}</a-checkbox>
                    </a-form-item>
                    <a float-right style="color: #ff0000;" href="">{{ t("page.login.forgot") }}</a>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" @click="handleLogin" style="width: 100%">
                        {{ t("page.login.submit") }}
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { message } from "ant-design-vue";

    const formRef = ref()
    const captchaBase64Image = ref('')
    const rememberMe = ref(true)
    const { t } = useI18nLocale()
    const router = useRouter()

    const loginForm = reactive({
        username: "",
        password: "",
        captcha: ""
    })
    const rules = {
        username: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
        // captcha: [{ required: true, message: '验证码不能为空' }]
    }

    const handleLogin = () => {
        formRef.value.validate().then(() => {
            try {
                AuroraLoading.show()
                message.success(t("page.login.success"))
                router.push("/home")
            } catch (e) {
                message.error(t("page.login.success"))
            } finally {
                AuroraLoading.hide()
            }
        })
    }

    const getCaptcha = () => {

    }

</script>

<style lang="less" scoped>
@import "./index.less";
</style>