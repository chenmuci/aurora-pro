/*
 * loading 组件
 */
export const AuroraLoading = {
    show: () => {
        useSpinStore().show()
    },

    hide: () => {
        useSpinStore().hide()
    }
}