<template>
    <a-dropdown class="avatar-wrap" :get-popup-container="getPopupContainer">
        <div class="wrapper">
            <img class="avatar-image" :src="avatar" v-if="avatar" alt=""/>
            <a-avatar v-else style="margin: 0 5px" :size="20">
                {{ username }}
            </a-avatar>
            <span class="name">{{ username }}</span>
        </div>
        <template #overlay>
            <a-menu>
                <a-menu-item @click="toAccount()">
                    <template #icon>
                        <my-icon name="UserOutlined" />
                    </template>
                    <span>个人中心</span>
                </a-menu-item>
                <a-menu-item @click="toAccount('1')">
                    <template #icon>
                        <my-icon name="LockOutlined" />
                    </template>
                    <span>修改密码</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item @click="onLogout">
                    <template #icon>
                        <my-icon name="LogoutOutlined" />
                    </template>
                    <span>退出登录</span>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
    import { message } from "ant-design-vue"

    const router = useRouter()
    const avatar = ref('https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png')
    const username = ref('超级管理员')

    const getPopupContainer = () => {
        return document.body
    }

    const onLogout = () => {
        message.success("退出成功")
        router.push("/login")
        location.reload()
    }

    const toAccount = (id?: string) => {
        router.push({
            path: "/account",
            query: { id }
        })
    }
</script>

<style lang="less" scoped>
@import "index.less";
</style>