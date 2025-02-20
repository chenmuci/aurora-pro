<template>
    <div class="login-container">
        <div class="login-form">
            <a-typography class="form-title"><h4>欢迎登录</h4></a-typography>
            <a-form :model="loginForm" style="width: 100%">
                <a-form-item name="username">
                    <a-input v-model:value="loginForm.username" placeholder="请输入用户账号" allow-clear>
                        <template #prefix>
                            <my-icon name="UserOutlined" mr5px />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="password">
                    <a-input-password v-model:value="loginForm.password" placeholder="请输入用户密码" allow-clear>
                        <template #prefix>
                            <my-icon name="LockOutlined" mr5px />
                        </template>
                    </a-input-password>
                </a-form-item>
<!--                <a-form-item name="captcha">
                    <a-row>
                        <a-col :span="14">
                            <a-input v-model:value="loginForm.captcha" placeholder="请输入验证码" allow-clear>
                                <template #prefix>
                                    <my-icons name="SafetyCertificateOutlined" mr5px />
                                </template>
                            </a-input>
                        </a-col>
                        <a-col :span="10" pl10px>
                            <a-button :disabled="isDisabled" @click="handleCaptcha" style="width: 100%">{{ buttonText }}</a-button>
                        </a-col>
                    </a-row>
                </a-form-item>-->
                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="loginForm.rememberMe">记住密码</a-checkbox>
                    </a-form-item>
                    <a float-right style="color: #ff0000;" href="">忘记密码？</a>
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="LoginDisabled" type="primary" html-type="submit" @click="handleLogin" style="width: 100%">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    const isDisabled = ref(false)
    const loginForm = reactive({
        username: "",
        password: "",
        captcha: "",
        rememberMe: true
    })
    const buttonText = ref("获取验证码")

    const LoginDisabled = computed(() => {
        return !(loginForm.username && loginForm.password)
    })

    const handleCaptcha = () => {
        let countdown = 60
        let timer: any = null
        isDisabled.value = true
        buttonText.value = `${countdown}秒后重新获取`
        timer = setInterval(() => {
            countdown--
            buttonText.value = `${countdown}秒后重新获取`
            if (countdown <= 0) {
                clearInterval(timer)
                isDisabled.value = false
                buttonText.value = '获取验证码'
                countdown = 60
            }
        }, 1000)
    }

    const handleLogin = () => {
    }

    onMounted(() => {
        handleCaptcha()
    })
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
    .login-form {
        width: 500px;
        padding: 64px;
        .form-title {
            position: relative;
            margin-bottom: 20px;
            padding-left: 14px;
            font-weight: 600;
            line-height: 1;
        }
        .form-title:before {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 4px;
            height: 100%;
            background: #2aa7a7;
            visibility: visible;
            content: "";
        }
    }
}
</style>