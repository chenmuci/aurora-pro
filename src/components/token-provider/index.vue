<template>
    <slot />
</template>

<script setup lang="ts">
    import { theme } from 'ant-design-vue'

    defineOptions({
        name: 'TokenProvider',
    })

    const { token } = theme.useToken()
    const { setToken } = useAntdToken()

    watchEffect(() => {
        setToken(token.value)
    })
</script>