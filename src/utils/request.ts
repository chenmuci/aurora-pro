import type { AxiosInstance } from "axios";
import axios from "axios";
import { message } from "ant-design-vue";

// token的消息头
const TOKEN_HEADER = 'x-access-token';

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000
})

// ================================= 请求拦截器 =================================
instance.interceptors.request.use(
        (config) => {
            // 在发送请求之前消息头加入token token
            const token = localStorage.getItem("token")
            if (token) {
                config.headers[TOKEN_HEADER] = token
            } else {
                delete config.headers[TOKEN_HEADER]
            }
            return config
        },
        (error) => {
            // 对请求错误做些什么
            return Promise.reject(error)
        }
)

// ================================= 响应拦截器 =================================
instance.interceptors.response.use(
        (response) => {
            return response.data
        },
        (error) => {
            // 对响应错误做点什么
            if (error.message.indexOf('timeout') !== -1) {
                message?.error('网络超时')
            } else if (error.message === 'Network Error') {
                message?.error('网络连接错误')
            } else if (error.message.includes('Request')) {
                message?.error('服务器内部错误，请联系管理员')
            }
            return Promise.reject(error);
        }
)

// ================================= 对外提供请求方法：通用请求，get， post, 下载download等 =================================
/**
 * 通用请求封装
 * @param config
 */
export const request = (config: any) => {
    return instance.request(config)
}

/**
 * get请求
 */
export const useGet = (url: string, params?: any) => {
    return request({ url, method: 'get', params })
}

/**
 * post请求
 */
export const usePost = (url: string, data?: any) => {
    return request({
        data,
        url,
        method: 'post'
    })
}