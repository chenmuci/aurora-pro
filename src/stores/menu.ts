import type {MenuListType} from "@/types/global";

/**
 * 菜单路由
 */
export const useMenuStore = defineStore('menu', () => {

    let menuList: MenuListType[] = []

    const getMenuList = () => {
        return menuList
    }

    const setMenuList = (list: []) => {
        menuList = list
    }

    const saveIframeRoutes = (list: MenuListType[]) => {
        sessionStorage.setItem('iframeRoutes', JSON.stringify(list))
    }

    return {
        getMenuList,
        setMenuList,
        saveIframeRoutes
    }

})