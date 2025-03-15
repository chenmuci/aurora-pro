export default [
    {
        "path": "/home",
        "component": "views/home/index",
        "meta": {
            "title": "首页",
            "icon": "DashboardOutlined",
            "locale": "route.home",
            "link": '0',
            "keepAlive": '1',
            "cache": '1',
            "hide": '0',
            "iframe": false
        }
    },
    {
        "path": "/docs",
        "component": "layout/index",
        "meta": {
            "title": "文档中心",
            "icon": "ReadOutlined",
            "locale": "route.docs",
        },
        "children": [
            {
                "path": "/docs/help",
                "component": "views/docs/help/index",
                "meta": {
                    "title": "帮助文档",
                    "icon": "QuestionCircleOutlined",
                    "locale": "route.docs.help"
                }
            },
            {
                "path": "/docs/knife4j",
                "component": "",
                "meta": {
                    "title": "Knife4j 接口文档",
                    "icon": "ApiOutlined",
                    "locale": "route.docs.knife4j"
                }
            },
            {
                "path": "/docs/swagger",
                "component": "",
                "meta": {
                    "title": "Swagger 接口文档",
                    "icon": "ApiOutlined",
                    "locale": "route.docs.swagger"
                }
            }
        ]
    },
    {
        "path": "/logs",
        "component": "layout/index",
        "meta": {
            "title": "系统日志",
            "icon": "SaveOutlined",
            "locale": "route.logs",
        },
        "children": [
            {
                "path": "/logs/login",
                "component": "views/log/login/index",
                "meta": {
                    "title": "登录日志",
                    "icon": "LoginOutlined",
                    "locale": "route.logs.login"
                }
            },
            {
                "path": "/logs/operate",
                "component": "views/log/operate/index",
                "meta": {
                    "title": "操作日志",
                    "icon": "FileAddOutlined",
                    "locale": "route.logs.operate"
                }
            }
        ]
    },
    {
        "path": "/components",
        "component": "layout/index",
        "meta": {
            "title": "系统组件",
            "icon": "GlobalOutlined",
            "locale": "route.components",
        },
        "children": [
            {
                "path": "/components/icons",
                "component": "views/components/icons/index",
                "meta": {
                    "title": "图标库",
                    "icon": "FileTextOutlined",
                    "locale": "route.components.icons"
                }
            },
            {
                "path": "/components/icons-select",
                "component": "views/components/icons-select/index",
                "meta": {
                    "title": "图标选择器",
                    "icon": "FileTextOutlined",
                    "locale": "route.components.icon-select"
                }
            },
            {
                "path": "/components/echarts",
                "component": "views/components/echarts/index",
                "meta": {
                    "title": "Echarts图表",
                    "icon": "FileTextOutlined",
                    "locale": "route.components.echarts"
                }
            },
            {
                "path": "/components/wang-editor",
                "component": "views/components/wang-editor/index",
                "meta": {
                    "title": "富文本编辑器",
                    "icon": "FileTextOutlined",
                    "locale": "route.components.wang-editor"
                }
            },
            {
                "path": "/components/upload",
                "component": "views/components/upload/index",
                "meta": {
                    "title": "文件上传",
                    "icon": "FileTextOutlined",
                    "locale": "route.components.upload"
                }
            }
        ]
    },
    {
        "path": "/monitor",
        "component": "layout/index",
        "meta": {
            "title": "系统监控",
            "icon": "FundOutlined",
            "locale": "route.monitor",
        },
        "children": [
            {
                "path": "/monitor/online",
                "component": "views/monitor/online/index",
                "meta": {
                    "title": "在线用户",
                    "icon": "SolutionOutlined",
                    "locale": "route.monitor.online"
                }
            },
            {
                "path": "/monitor/server",
                "component": "views/monitor/server/index",
                "meta": {
                    "title": "服务监控",
                    "icon": "CloudServerOutlined",
                    "locale": "route.monitor.server"
                }
            },
            {
                "path": "/monitor/cache",
                "component": "views/monitor/cache/index",
                "meta": {
                    "title": "缓存监控",
                    "icon": "DatabaseOutlined",
                    "locale": "route.monitor.cache"
                }
            }
        ]
    },
    {
        "path": "/system",
        "component": "layout/index",
        "meta": {
            "title": "系统管理",
            "icon": "SettingOutlined",
            "locale": "route.system",
        },
        "children": [
            {
                "path": "/system/setting",
                "component": "views/system/setting/index",
                "meta": {
                    "title": "系统配置",
                    "icon": "AppstoreOutlined",
                    "locale": "route.system.setting"
                }
            },
            {
                "path": "/system/user",
                "component": "views/system/user/index",
                "meta": {
                    "title": "用户管理",
                    "icon": "UserOutlined",
                    "locale": "route.system.user"
                }
            },
            {
                "path": "/system/role",
                "component": "views/system/role/index",
                "meta": {
                    "title": "权限管理",
                    "icon": "FileProtectOutlined",
                    "locale": "route.system.role"
                }
            },
            {
                "path": "/system/dept",
                "component": "views/system/dept/index",
                "meta": {
                    "title": "部门管理",
                    "icon": "icon-office-building",
                    "locale": "route.system.dept"
                }
            },
            {
                "path": "/system/post",
                "component": "views/system/post/index",
                "meta": {
                    "title": "岗位管理",
                    "icon": "ApartmentOutlined",
                    "locale": "route.system.post"
                }
            },
            {
                "path": "/system/menu",
                "component": "views/system/menu/index",
                "meta": {
                    "title": "菜单管理",
                    "icon": "MenuOutlined",
                    "locale": "route.system.menu"
                }
            },
            {
                "path": "/system/dict",
                "component": "views/system/dict/index",
                "meta": {
                    "title": "字典管理",
                    "icon": "BookOutlined",
                    "locale": "route.system.dict"
                }
            },
            {
                "path": "/system/storage",
                "component": "views/system/storage/index",
                "meta": {
                    "title": "存储管理",
                    "icon": "BookOutlined",
                    "locale": "route.system.storage"
                }
            }
        ]
    }
]