// 菜单
export type MenuListType = {
    path: string                    // 路由地址
    component: string               // 组件地址
    meta: {
        title: string               // 菜单标题
        locale: string              // 菜单国际化
        icon: string                // 菜单图标
        cache: boolean              // 是否缓存
        hide: boolean               // 是否隐藏
        keepAlive: boolean          // 是否固定
        iframe?: boolean            // 是否iframe
        link?: string               // 链接
    },
    children?: MenuListType[]       // 子菜单
}