<template>
    <div class="exception-wrap">
        <div class="tips">
            <img :src="data.imgUrl" alt="">
            <div class="right-wrap">
                <p>{{ data.desc }}</p>
                <a-button type="primary" @click="backHome">{{ data.btnText }}</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { PropType } from "vue";

    const router = useRouter()

    defineProps({
        data: {
            type: Object as PropType<{
                title: string
                desc: string
                btnText: string
                imgUrl: string
            }>,
            required: true
        }
    })

    const backHome = () => {
        router.push("/")
    }
</script>

<style lang="less" scoped>
@import "./index";
</style>