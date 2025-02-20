/*
 * loading
 */
export const useSpinStore = defineStore('spin', () => {
    let loading = false

    const hide = () => {
        loading = false
        let spins: any = document.querySelector('.ant-spin-nested-loading')
        spins.style.zIndex = 999
    }

    const show = () => {
        loading = true
        let spins: any = document.querySelector('.ant-spin-nested-loading')
        spins.style.zIndex = 1001
    }

    return {
        loading,
        hide,
        show
    }
})